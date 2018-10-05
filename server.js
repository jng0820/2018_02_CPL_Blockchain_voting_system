
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse([
    {
        "constant": false,
        "inputs": [
            {
                "name": "_id",
                "type": "string"
            }
        ],
        "name": "startvote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_idx",
                "type": "uint256"
            }
        ],
        "name": "get_votenum",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "a",
                "type": "string"
            },
            {
                "name": "b",
                "type": "string"
            }
        ],
        "name": "compareString",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_id",
                "type": "string"
            }
        ],
        "name": "signUp",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidateList",
        "outputs": [
            {
                "name": "upVote",
                "type": "uint256"
            },
            {
                "name": "party",
                "type": "string"
            },
            {
                "name": "name",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_id",
                "type": "string"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_party",
                "type": "string"
            }
        ],
        "name": "addCandidator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_id",
                "type": "string"
            },
            {
                "name": "_idxnumber",
                "type": "uint256"
            }
        ],
        "name": "upVote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_id",
                "type": "string"
            }
        ],
        "name": "finish_Vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "party",
                "type": "string"
            }
        ],
        "name": "AddCandidate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "voteNumber",
                "type": "uint256"
            }
        ],
        "name": "UpVote",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "Alive",
                "type": "bool"
            }
        ],
        "name": "FinishVote",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "voteStart",
        "type": "event"
    }
]);

VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0x35bc167fd83e3267c14c7f762ff7325b4784632b'); // deploy 할때 바꿀것
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = 3000;
var mongoose = require('mongoose');
var num_of_candidate = 0;

app.set('view engine','jade');
app.set('views','./views');
app.use(bodyParser.urlencoded({extended:false}));

var UserSchema;
var CandidateSchema;
var UserModel;
var CandidateModel;
function connectDB(){
    var dbUrl = "mongodb://localhost:27017/DB"

    mongoose.connect(dbUrl);
    db = mongoose.connection;

    db.on('error',console.error.bind(console,'mongoose connection err'));
    db.on('open',() =>{
        CandidateSchema = mongoose.Schema({
            idx: Number,
            name: String,
            party: String
        });
        UserSchema = mongoose.Schema({
            id: String,
            password: String,
            name: String,
            phone: String
        });
        CandidateModel = mongoose.model("candidates",CandidateSchema);
        UserModel = mongoose.model("users", UserSchema);
        console.log('mongoose connection open! : '+dbUrl);
    });
    db.on('disconnected',connectDB);
}
app.get('/',(req,res) =>
{
    res.send('Hello World\n');
    console.log('Customer join!');
});
app.use(express.static('public'));
app.get('/', (req,res) =>
{

})
app.get('/signUp',(req,res) =>{

})
app.post('/signUp',(req,res)=>{
    var id = req.body.id;
    var pw = req.body.pw;
    var name = req.body.name;
    var phone = req.body.phone;
    UserModel.find({id: id}, (err, result)=>{
        if(result.length == 0)
        {
            var newUser = new UserModel({id: id,password: pw,name: name, phone: phone});
            newUser.save(err =>{

            })

        }
    })

    // 블록체인에 트랜잭션 보내기 추가
})
app.get('/new_candiddate', (req,res) => {

})
app.post('/new_candidate', (req,res) => {
    var name = req.body.name;
    var party = req.body.party;
    var newCandidate = new CandidateModel({idx: num_of_candidate, name: name, party: party});
    newCandidate.save(err => {

    })
    num_of_candidate += 1;

    // 블록체인에 트랜잭션 보내기 추가
})
app.get('/login',(req,res) => {

})
app.post('/login',(req,res) =>{
    var id = req.body.id;
    var pw = req.body.pw;
    UserModel.find({id: id}, (err, result)=>{
        if(result.length == 1 && result[0].password == pw)
        {

        }
    })
})
app.get('/admin',(req,res) => {

})
app.get('/vote',(req,res) => {

})
app.post('/vote',(req,res)=>{
    var id = req.body.id;
    var idx = req.body.idx;

    // 블록체인에 트랜잭션 보내기 추가
})
app.get('/result',(req,res) =>
{

})
app.listen(port,() =>
{
    console.log(`Connected ${port} port!`);
    connectDB();
    console.log('DB connect');
});