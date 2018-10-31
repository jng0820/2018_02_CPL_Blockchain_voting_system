

var Web3;
var abi;
var VotingContract;
var contractInstance;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = 3000;
var mongoose = require('mongoose');
var num_of_candidate = 0;
var md5 = require('md5');
var salt = '$%#@7@zvvcweer';
var session = require('express-session')
app.use(session({
    secret: 'asd@fij80-124', // 암호화
    resave: false,
    saveUninitialized: true
}));
var path = require('path');
app.use(express.static(path.join(__dirname,'views')))

var ejs = require('ejs');
app.set('view engine','ejs');
app.set('views','./views');
app.use(bodyParser.urlencoded({extended:false}));

var UserSchema;
var CandidateSchema;
var UserModel;
var CandidateModel;

function web3_connect(){
    Web3 = require('web3')
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    abi = JSON.parse(`[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "string"
			}
		],
		"name": "startvote",
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
			},
			{
				"name": "_idxnumber",
				"type": "uint256"
			}
		],
		"name": "upVote",
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
		"name": "finish_Vote",
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
]`);
    VotingContract = web3.eth.contract(abi);
    contractInstance = VotingContract.at('0xe54884535e63812a8a55e562d61a7d653362b4e8'); // deploy 할때 바꿀것

}

function ID_Hashing(_id){
    if(_id != 'admin')
        var id =  md5(id+salt);
    else var id = 'admin';
    return id;
}

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
    res.render('index');
    console.log('Customer join!');
});
app.use(express.static('public'));
app.get('/signUp',(req,res) =>{
    res.render('member/join');
})
app.post('/signUp',(req,res)=>{
    var id = ID_Hashing(req.body.id);
    var pw = md5(req.body.pw+salt);
    var name = req.body.name;
    var phone = req.body.phone;
    UserModel.find({id: id}, (err, result)=>{
        if(result.length == 0)
        {
            var newUser = new UserModel({id: id,password: pw,name: name, phone: phone});
            newUser.save(err =>{

            })
            contractInstance.signUp(id,{from:web3.eth.accounts[0],gas:4700000},() => {

            })
            res.send("가입되었습니다.");
            console.log(id+' '+name+' signup success.');
        }
        else
            res.send("이미 가입된 회원입니다.");
    })
})

app.get('/login',(req,res) => {
    if(req.session.id == 'admin')
        res.redirect('/admin');
    else {
        UserModel.find({id: req.session.id}, (err, result) => {
            if (result == 0)
                res.render('login');
            else res.redirect('/vote');

        });
    }
})
app.post('/login',(req,res) =>{
    var id = req.body.id;
    var pw = md5(req.body.pw+salt);
    UserModel.find({id: id}, (err, result)=>{
        if(result.length == 1 && result[0].password == pw)
        {
            res.session.id = id;
            res.redirect('/login');
        }
        else{
            res.render('login_fail');
        }
    })
})
app.get('/admin',(req,res) => {

})
app.post('/admin',(req,res)=>{
    var check = false;
    //세션에서 받는 값에 따라, 투표 시작/종료 혹은 후보자등록 구분
    /*
    var name = req.body.name;
    var party = req.body.party;
    var id = ID_Hashing(req.session.id);
    var newCandidate = new CandidateModel({idx: num_of_candidate, name: name, party: party});
    newCandidate.save(err => {

    })
    num_of_candidate += 1;
    contractInstance.addCandidator(id,name,party,{from:web3.eth.accounts[0],gas:4700000},() => {

    })

    if(req.body.value == 1)
    {
        check = contractInstance.startvote('admin',{from:web3.eth.accounts[0],gas:4700000},()=>{})
    }
    else(req.body.value == 2)
    {
        check = contractInstance.finish_Vote('admin',{from:web3.eth.accounts[0],gas:4700000},()=>{})
    }
    if(check == true)
    {
        if(req.body.value == 1)
            console.log('voting start!');
        else console.log('voting end');
    }
    */
})
app.get('/vote',(req,res) => {
    var name = new Array();
    var party = new Array();
    CandidateModel.find({}, (err,result)=>{
        for (var i=0;i<result.length;i++)
        {
            name[i] = result[i]._doc.name;
            party[i] = result[i]._doc.party;
        }
    });
    res.render('vote',{name:name,party:party});
})
app.post('/vote',(req,res)=>{
    var id = ID_Hashing(req.session.id);
    var idx = parseInt(req.body.idx);
    var check = false;
    check = contractInstance.upVote(id,idx,{from:web3.eth.accounts[0],gas:4700000},() => {

    })
    if(check == true)
        console.log('vote commit success.')
})
app.get('/result',(req,res) =>
{
    var name = new Array();
    var party = new Array();
    var vote_num = new Array();
    CandidateModel.find({}, (err,result)=>{
        for (var i=0;i<result.length;i++)
        {
            name[i] = result[i]._doc.name;
            party[i] = result[i]._doc.party;
            vote_num[i] = contractInstance.get_votenum(i,{from:web3.eth.accounts[0], gas:4700000},()=>{});
        }
    });
    res.render('result',{name:name,party:party,num:vote_num});

})
app.listen(port,() =>
{
    console.log(`Connected ${port} port!`);
    web3_connect();
    if(web3.eth.accounts) {
        console.log('Ethreum connected.');
        console.log(web3.eth.accounts);
    }
    connectDB();
    console.log('DB connected.');
});