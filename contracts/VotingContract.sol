//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;

    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address candidateAddress;
        string ipfs;
    }

    event CandidateCreate (
        uint256 indexed candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address candidateAddress,
        string ipfs
    );

    // Array to keep track of candidate addresses (for listing, if needed)
    address[] public candidateAddresses;
    // Store candidates by candidateId
    mapping(uint256 => Candidate) public candidates;

    address[] public votedVoters;

    address[] public votersAddress;
    mapping(address => Voter) public voters;

    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint256 voter_allowed;
        bool voter_voted;
        uint256 voter_vote; // will hold the candidateId that the voter voted for
        string voter_ipfs;
    }

    event VoterCreated (
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

    constructor () {
        votingOrganizer = msg.sender;
    }

    function setCandidate(
        address _address,
        string memory _age,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(votingOrganizer == msg.sender, "Only organizer can set candidate");
        _candidateId.increment();
        uint256 idNumber = _candidateId.current();

        Candidate storage candidate = candidates[idNumber];
        candidate.age = _age;
        candidate.name = _name;
        candidate.candidateId = idNumber;
        candidate.image = _image;
        candidate.voteCount = 0;
        candidate.candidateAddress = _address;
        candidate.ipfs = _ipfs; 

        candidateAddresses.push(_address); 

        emit CandidateCreate(
            idNumber,
            _age,
            _name,
            _image,
            candidate.voteCount,
            _address,
            _ipfs
        );
    }

    // Returns list of candidate addresses (if needed for display)
    function getCandidateAddresses() public view returns (address[] memory) {
        return candidateAddresses;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddresses.length;
    }

    // Now uses candidateId to fetch candidate data
    function getCandidateData(uint256 candidateId) public view returns(
        string memory, 
        string memory, 
        uint256, 
        string memory, 
        uint256, 
        string memory, 
        address
    ) {
        Candidate storage candidate = candidates[candidateId];
        return (
            candidate.age,
            candidate.name,
            candidate.candidateId,
            candidate.image,
            candidate.voteCount,
            candidate.ipfs,
            candidate.candidateAddress
        );
    }

    function voterRight(
        address _address, 
        string memory _name, 
        string memory _image, 
        string memory _ipfs
    ) public {
        require(votingOrganizer == msg.sender, "Only organizer allowed");

        uint256 idNumber = _voterId.current();

        Voter storage voter = voters[_address];
        require(voter.voter_allowed == 0, "Voter already allowed");

        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_image = _image;
        voter.voter_address = _address;
        voter.voter_voterId = idNumber;
        // Default vote value (could be set to 0 if no vote yet)
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;

        votersAddress.push(_address);

        emit VoterCreated(
            idNumber,
            _name,
            _image,
            _address,
            voter.voter_allowed,
            voter.voter_voted,
            voter.voter_vote,
            _ipfs
        );
    }

    // Updated vote function: now only takes candidateId as parameter
    function vote(uint256 candidateId) external {
        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "Already voted");
        require(voter.voter_allowed != 0, "Not allowed to vote");

        voter.voter_voted = true;
        voter.voter_vote = candidateId;

        votedVoters.push(msg.sender);

        candidates[candidateId].voteCount += voter.voter_allowed;
    }

    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    function getVoterData(address _address) public view returns (
        uint256, 
        string memory, 
        string memory, 
        address, 
        string memory, 
        uint256, 
        bool
    ) {
        Voter storage voter = voters[_address];
        return (
            voter.voter_voterId,
            voter.voter_name,
            voter.voter_image,
            voter.voter_address,
            voter.voter_ipfs,
            voter.voter_allowed,
            voter.voter_voted
        );
    }
      
    function getVotedVoterList() public view returns(address[] memory) {
        return votedVoters;
    }

    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }
}
