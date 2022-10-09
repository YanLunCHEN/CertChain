#pip install pycrypto
import cgi, base64
from Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
from base64 import b64encode

import binascii
import json

with open(r'./pem/private.pem') as f:
    key = RSA.import_key(f.read())
    f.close()



def sign(data,key):
    #print(key)
    hash = SHA256.new(data.encode('utf-8'))
    print("hash: ",hash.digest().hex())
    signer = PKCS115_SigScheme(key)
    signature = signer.sign(hash)
    return signature
    
def verify(signature,cert_buf):
    print("\n\n",cert_buf,"\n\n")
    print("sign: " , signature)
    with open(r'./pem/public.pem') as f:
        pubkey = RSA.import_key(f.read())
        f.close()
    print(pubkey)
    # Verify valid PKCS#1 v1.5 signature (RSAVP1)
    hash = SHA256.new(cert_buf.encode('utf-8'))
    verifier = PKCS115_SigScheme(pubkey)
    try:
        verifier.verify(hash, signature)
        return True
    except:
        return False

cert = {'name':'YAN-LUN,CHEN',
      'birth': '20000917',
      'date': '20230604',
      'degree': 'bachelor',
      'department': 'csie',
      'president': 'CI-MING,CHEN',
      'institution': 'Aletheia University',
      'expiration_date': '0'}
if __name__ == '__main__':
    cert_buf = json.dumps(cert).encode('utf-8').hex()
    #print("\n\n",cert_buf,"\n\n")
    signature = sign(cert_buf,key)



    print(verify(signature,cert_buf))
