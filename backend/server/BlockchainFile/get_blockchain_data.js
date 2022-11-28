import Web3 from "web3";
import Provider from '@truffle/hdwallet-provider';
const contract_abi =[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnerSet",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addressToWhitelist",
                "type": "address"
            }
        ],
        "name": "addAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "changeOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            }
        ],
        "name": "delet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            }
        ],
        "name": "get",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_whitelist",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addressToWhitelist",
                "type": "address"
            }
        ],
        "name": "removeAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "data",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            }
        ],
        "name": "set",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "datas",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "email_list",
                "type": "string[]"
            }
        ],
        "name": "set_list",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "update",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    }
];
const contract_address = '0x035f2398c7f623f6d61c0fc56830d1bf6866dec0';
var privatekey = '3ea49ecb8772c963968482006c6e12512bbc30be588105a047a50d45dc2ea4f5';
var rpcurl = 'https://goerli.infura.io/v3/173c456332bf465b8acce7a4a47167ec';
var address = '0x404D9a1Aa9216Cf64DaeC40e7368D9c741f3f560';

var provider = new Provider(privatekey, rpcurl);
var web3 = new Web3(provider); 
provider.engine._blockTracker.on('error', function (e) {
    console.log('BlockTracker error', e);
    console.log(e);
});
provider.engine.on('error', function (e) {
    console.log('Web3ProviderEngine error');
    console.log(e);
});
var myContract = new web3.eth.Contract(contract_abi, contract_address);

 function  get_BlockChainHash(index){
    return (new Promise(async (resolve, reject)=>{
         myContract.methods.get(index).call(function (err ,res) {
            if(err)  reject(err);
            provider.engine.stop();
            resolve(res);
        })
    }))
}
export {get_BlockChainHash}



