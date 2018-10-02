
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[\n' +
    '\t{\n' +
    '\t\t"constant": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "_id",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "signUp",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "_idx",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "get_votenum",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "_id",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "finish_Vote",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "_id",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "startvote",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "_id",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "_idxnumber",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "upVote",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": true,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "candidateList",\n' +
    '\t\t"outputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "upVote",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "party",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "name",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "view",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"constant": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "_id",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "_name",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"name": "_party",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "addCandidator",\n' +
    '\t\t"outputs": [],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "function"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"inputs": [],\n' +
    '\t\t"payable": false,\n' +
    '\t\t"stateMutability": "nonpayable",\n' +
    '\t\t"type": "constructor"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"anonymous": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"name": "name",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"name": "party",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "AddCandidate",\n' +
    '\t\t"type": "event"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"anonymous": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"name": "name",\n' +
    '\t\t\t\t"type": "string"\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"name": "voteNumber",\n' +
    '\t\t\t\t"type": "uint256"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "UpVote",\n' +
    '\t\t"type": "event"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"anonymous": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"name": "Alive",\n' +
    '\t\t\t\t"type": "bool"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "FinishVote",\n' +
    '\t\t"type": "event"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"anonymous": false,\n' +
    '\t\t"inputs": [\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"indexed": false,\n' +
    '\t\t\t\t"name": "owner",\n' +
    '\t\t\t\t"type": "address"\n' +
    '\t\t\t}\n' +
    '\t\t],\n' +
    '\t\t"name": "voteStart",\n' +
    '\t\t"type": "event"\n' +
    '\t}\n' +
    ']');

VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0x35bc167fd83e3267c14c7f762ff7325b4784632b');
var express = require('express');
var bodyParser = require('body-parser');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({extended:false}));
var app = express();
const port = 3000;
app.get('/',(req,res) =>
{
    res.send('Hello World\n');
    console.log('Customer join!');
});
app.use(express.static('public'));
app.get('/', (req,res) =>
{

})
app.post('/login',(req,res) =>{

})
app.get('/admin',(req,res) =>
{

});
app.get('/vote',(req,res) =>
{

});
app.get('/result',(req,res) =>
{

});
app.listen(port,() =>
{
    console.log(`Connected ${port} port!`);
});