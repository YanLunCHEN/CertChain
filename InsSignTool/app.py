import os
import cgi, base64
from Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
from base64 import b64encode
from flask import Flask, jsonify, request,make_response
app = Flask(__name__)
@app.route("/")
def index():
    return render_template('index.html')
@app.route("/verify")
def verify():
    signature = request.args.get('signature', default = "", type = str)
    cert_buf = request.args.get('cert_buf', default = "", type = str)
    signature = signature.encode().decode('unicode_escape').encode('raw_unicode_escape')
    print("cert_buf = ",cert_buf)
    with open(r'./pem/public.pem') as f:
        pubkey = RSA.import_key(f.read())
        f.close()
    # Verify valid PKCS#1 v1.5 signature (RSAVP1)
    hash = SHA256.new(cert_buf.encode('utf-8'))
    
    verifier = PKCS115_SigScheme(pubkey)
    try:
        verifier.verify(hash, signature)
        return jsonify({'status': 'success','data':'true'})
    except:
        return jsonify({'status': 'success','data':'false'})

@app.route("/verify_ins")
def verify_ins():
    return "hi"

@app.route('/verify_inst', methods=['POST'])
def verify_inst():
    if request.method == 'POST':
        try:
            publickey = request.get_json().get('publickey').replace("\n\n","\n")
            file_data = request.get_json().get('file_data').replace("\r\n","")
            signature = request.get_json().get('signature').replace("\r","")
        except AttributeError as err:
            return jsonify({'status': 'fail','error':err})
        except Exception as e:
            return jsonify({'status': 'fail','error': e})
        pubkey = RSA.import_key(publickey)
        hash = SHA256.new(file_data.encode('utf-8'))
        print(signature)
        print("hash v: ",hash.digest().hex())
        verifier = PKCS115_SigScheme(pubkey)
        try:
            verifier.verify(hash, bytes.fromhex(signature))
            return jsonify({'status': 'success','data':'true'})
        except:
            return jsonify({'status': 'success','data':'false'})
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=11000)

