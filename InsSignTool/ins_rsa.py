import tkinter as tk
from tkinter import filedialog
import csv
import json
import re
from Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
from sign import sign
class Cert:
    def __init__(self, cert_list):
        self.name = cert_list[0].replace('"',"")
        self.birth = cert_list[1].replace('"',"")
        self.date=cert_list[2].replace('"',"")
        self.degree=cert_list[3].replace('"',"")
        self.department=cert_list[4].replace('"',"")
        self.president=cert_list[5].replace('"',"")
        self.institution=cert_list[6].replace('"',"")
        self.expiration_date=cert_list[7].replace('"',"")
        self.email=cert_list[8].replace("\n","")
    def toJson(self):
        json_string = {'name':self.name,'birth':self.birth,'date':self.date,
                       'degree':self.degree,'department':self.department,
                       'president':self.president,'institution':self.institution,
                       'expiration_date':self.expiration_date
                       }
        return self.expiration_date,self.email,json_string
        
cert = []
root = tk.Tk()
root.withdraw()
cert_file_path = filedialog.askopenfilename(parent=root,
                                       title='Select file',
                                       initialdir='./',
                                       filetypes = (("excel files","*.csv"),("all files","*.*")))
if not cert_file_path:
    print('file path is empty')
else:
    print(cert_file_path)
    with open(cert_file_path, 'r',encoding = 'utf-8') as f:
        title = f.readline()
        datas = f.readlines()
        f.close()
certs = []
email = []
expire_date = []
for data in datas:
    try:
        if data==",,,,,,,,\n":
            datas.remove(data)
            continue
    except:
        pass
    _expire_date,_email,_cert = Cert(re.split(r",(?=(?:[^\"']*[\"'][^\"']*[\"'])*[^\"']*$)", data)).toJson()
    email.append(_email)
    expire_date.append(_expire_date)
    certs.append(_cert)

#sign
signature = []
file_path = filedialog.askopenfilename(parent=root,
                                       title='import key',
                                       initialdir='./',
                                       filetypes = (("private key","*.pem"),("all files","*.*")))
if not file_path:
    print('file path is empty')
else:
    with open(file_path) as f:
        signkey = RSA.import_key(f.read())
        f.close()
for cert in certs:
    _sign = sign(json.dumps(cert).encode('utf-8').hex(),signkey)
    signature.append(_sign)
#print("cert data : ",json.dumps(certs[0]).encode('utf-8').hex())
#bytes.fromhex()可轉回原始資料
signed_datas = []
for _sign in signature:
    signed_datas.append(_sign.hex()+json.dumps(certs[signature.index(_sign)]).encode('utf-8').hex());
    #bytes.fromhex(json.dumps(certs[0]).encode('utf-8').hex()).decode('utf-8'))
#print(signed_datas[0])
#encode
from Crypto.Cipher import PKCS1_OAEP
encrypted_signed_datas=[]
pubKey = """-----BEGIN RSA PUBLIC KEY-----
MIIC0QKCAsgA3Zs6AhhWDe4RlYuljjsyPfFMWyA6FptrMy189qOoZfX/BBbQ5kNm
A+hZt6dK+vrZkIzlinUh6YAwpo+8UdjtLcQuMpRrrmEScD+XAYpfdTCn2bkrtcnr
Eie2FhxRr9NtsOHRfdK5cYJ8W5k2P+Cw1rCch4laSogQ7razhTWvWnccZ8r+EZd7
iNiZbBLu6uPHBStLOkO9FZmrBioP8wG+jL3Vw+wIb++5oyNd4im+1+dyxOWxZ75O
y4zGZju99i+S2A1oiLOgKD4woXpQviobH23/OpWA5zqs4vz+21Yuu/hcSOqnKwli
AS0nh3ju8NMP0F8A33z73AKSp6mbBWXysfeAUNQ0ZIG4C+vOptzSBSmOzEsIUFBW
IA6VVdz722qiljCazxTLCylAQGF1BQPkpi8wVYwvpJ4+IQzcqgL9XMQPWrL+Bqvb
ettujMXRKCegGLvmdMvkfcfO2WYoIwi71Ah1ncJ6SdXpfBz12ERjOZbxwJ8JSfSB
f5CTOtnFilSH7Pk4pBgTwvl1QFjH7fHTBVtFnUAL04Ux/r7THfwxnAHeOqxQBYTW
5i8+c1+fy69orktqcQ7EriS/qZTAGS/EEOo9fT6VoItWfN0/QONz4czF7qWgDh+A
crw/TSqLr0QSLpbOGPcpJuntQPtN5aAj4wRt0NefB6LwHxxQjaUoz9OpFa4gFOes
bKQbypvTGHTjPPbyqwtp32E4d2vyHnDvlxNvoHulMyVCnewbWrKmW12ELmW7OS6I
ap50BJ9lw9q0EzR6a0BHy5VtHuM+jLsnIczinW15tIGUZKrmzUjnJbPuQU3kvxD1
RG5NgafMIhZVOlUMlM/4fm0XZiI/MbtmiyaZpw8ggcMlQZP63emKOLeSR9XheN3h
2YLhaLYy7ST2k2Z5/wjjBb5fUyY8gwVbmzqCbG33UGYXns+2QqXyzWAESnqIrfp3
AgMBAAE=
-----END RSA PUBLIC KEY-----"""
key = RSA.import_key(pubKey)
key = PKCS1_OAEP.new(key)
#print("@@@@",signed_datas[0])
#print("&&&&",key.encrypt(str.encode(signed_datas[0])).hex())
for signed_data in signed_datas:
    encrypted_signed_datas.append(key.encrypt(str.encode(signed_data)).hex())
#print(encrypted_signed_datas)

#write csv

with open('output.csv', 'w', newline='') as csvfile:
  
    writer = csv.writer(csvfile)
    i=0
    for encrypted_signed_data in encrypted_signed_datas:
        writer.writerow([encrypted_signed_data, email[i], expire_date[i]])
        i=i+1
    csvfile.close()
with open('output.csv', 'r') as csvfile:
    ins_data = csvfile.read().replace("\n","")
    csvfile.close()
#sign
print(ins_data)
_sign = sign(ins_data,signkey)
print(_sign)
file="signed.csv"#+cert_file_path.split("/")[-1]

with open(file, 'w', newline='') as csvfile:
      
    writer = csv.writer(csvfile)
    writer.writerow([_sign.hex()])
    i=0
    for encrypted_signed_data in encrypted_signed_datas:
        writer.writerow([encrypted_signed_data, email[i], expire_date[i]])
        i=i+1
    csvfile.close()
with open(r'./pem/public.pem') as f:
        pubkey = RSA.import_key(f.read())
        f.close()
# Verify valid PKCS#1 v1.5 signature (RSAVP1)
hash = SHA256.new(ins_data.encode('utf-8'))
print("hash v: ",hash.digest().hex())
verifier = PKCS115_SigScheme(pubkey)
try:
    verifier.verify(hash, _sign)
    print("true")
except:
    print("false")
