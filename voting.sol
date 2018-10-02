pragma solidity 0.4.25;


contract Voting{
    struct candidate{
        uint upVote;
        string party;
        string name;
    }
    //candidate
    struct voter{
        int right;
        bool voteCheck;
    }
    
    candidate[] public candidateList;
    bool voteAlive;
    address owner;
    //variable
    
    mapping(uint => voter) voterlist;
    
    event AddCandidate(string name,string party);
    event UpVote(string name, uint voteNumber);
    event FinishVote(bool Alive);
    event voteStart(address owner);
    //event
    
    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
    //modifier
    
    constructor() public{
        owner = msg.sender;
        
        emit voteStart(owner);
    }
    //constructor
    
    function signUp(uint _id) public{
        if(_id == 0)
            voterlist[_id] = (voter(1,false));
        else
            voterlist[_id] = (voter(0,false));
    }
    
    function addCandidator(uint _id,string _name, string _party) public onlyOwner{
        require(voteAlive == false);
        require(voterlist[_id].right == 1);
        candidateList.push(candidate(0,_party,_name));
        
        emit AddCandidate(_name,_party);
        //emit event
    }
    // add candidates
    
    function startvote(uint _id) public onlyOwner{
        require(voteAlive == false);
        require(_id == 0);
        voteAlive = true;
    }
    //vote start
    
    function upVote(uint _id, uint _idxnumber) public {
        require(voteAlive == true);
        require(_idxnumber < candidateList.length);
        require(voterlist[_id].voteCheck == false);
        candidateList[_idxnumber].upVote += 1;
        voterlist[_id].voteCheck = true;
        emit UpVote(candidateList[_idxnumber].name,candidateList[_idxnumber].upVote);
        //emit event
    }
    
    // vote
    
    
    function finish_Vote(uint _id) public onlyOwner{
        require(voteAlive == true);
        require(voterlist[_id].right == 1);
        voteAlive = false;
        
        emit FinishVote(voteAlive);
        
    }
    // finish vote
    
    function get_votenum(uint _idx) public onlyOwner returns(uint){
        require(voteAlive == false);
        return candidateList[_idx].upVote;
    }
}

