from flask import Flask, jsonify, request,make_response,render_template
from Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
app = Flask(__name__)
@app.route("/")
def index():
    return '''<!DOCTYPE html>
<html>

<head>
	<title>簽章與JsonDataHex驗證</title>
</head>

<body>
	<!--<input type="file" name="inputfile"
			id="inputfile">
	<br>
-->
	<pre id="output"></pre>
	
	
	<h1>簽章與JsonDataHex驗證</h1>
        <form method="POST" enctype="multipart/form-data" action="http://127.0.0.1:11000/verify">	
            <label for="publickey">Public key</label><br />
	    <input accept=".pem" id="publickey" name="publickey" type="file"><br />
            <label for="signature">Signature</label><br />
            <input style="width:80em" type="text" name="signature" id="signature"></input><br />
            <label for="json">JsonDataHex</label><br />
            <input style="width:80em" type="text" name="json" id="json"></input><br />
            <input type="submit" value="Submit"></input> 
        </form>
		
		
</body>
	

</html>


<!-- http://127.0.0.1:11000/verify -->
<!-- http://218.161.4.208:11000/verify -->
'''
@app.route('/verify', methods=['POST'])
def verify():
    if request.method == 'POST':
        try:
            publickey = request.files['publickey']
            publickey = publickey.read().decode("utf-8")
            file_data = request.values['json'] 
            signature = request.values['signature']
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
            print("{'status': 'success','data':'true'}")
            return '''<!DOCTYPE html>
                      <html>
                      <head>
                      <title>簽章與JsonDataHex驗證</title>
                      </head>
                      <body>
                      <h1>True</h1>
                      <p><a href="http://localhost:11000/">Back to Verifier</a></p>
                      </body>	
                      </html>'''   
        except:
            print("{'status': 'success','data':'false'}")
            return '''<!DOCTYPE html>
                      <html>
                      <head>
                      <title>簽章與JsonDataHex驗證</title>
                      </head>
                      <body>
                      <h1>False</h1>
                      <p><a href="http://localhost:11000/">Back to Verifier</a></p>
                      </body>	
                      </html>'''

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=11000,threaded=True)
