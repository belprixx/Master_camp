web3 = new Web3(new Web3.providers.HttpProvider("http://163.5.245.96:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
    VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xe9bc9687c998531354fa07b21aae8e66c3a4b0fc');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"};
public_key_candidates = {"candidate-1": web3.eth.accounts[0], "candidate-2": web3.eth.accounts[1], "candidate-3": web3.eth.accounts[2]};

    function voteForCandidate(candidate) {
	candidateName = $("#candidate").val();
	contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
		let div_id = candidates[candidateName];
		//$("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
		sendVote(div_id);
	    });
    }

    function sendVote(id_receiver){
    var sender = web3.eth.accounts[8];
 	var receiver = public_key_candidates[id_receiver];
 	var amount = web3.toWei(1, "ether");

 	web3.eth.sendTransaction({from:sender, to:receiver, value: amount})

 	candidateNames = Object.keys(candidates);
 	candidateKey = Object.keys(public_key_candidates);
			for (var i = 0; i < candidateNames.length; i++) {
	    		let name = candidateNames[i];
	    		let nbCandidate = candidateKey[i];
	    		let key = public_key_candidates[nbCandidate];
	    		//let val = contractInstance.totalVotesFor.call(name).toString()
	    		let val = web3.fromWei(web3.eth.getBalance(key)).c[0];
				$("#" + candidates[name]).html(val);
    		}
    		let nbCoins = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[8])).c[0];
 			$("#nbCoins").html(nbCoins);
    	}

$(document).ready(function() {
	candidateNames = Object.keys(candidates);
 	candidateKey = Object.keys(public_key_candidates);
 	let nbCoins = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[8])).c[0];
 	$("#nbCoins").html(nbCoins);
			for (var i = 0; i < candidateNames.length; i++) {
	    		let name = candidateNames[i];
	    		let nbCandidate = candidateKey[i];
	    		let key = public_key_candidates[nbCandidate];
	    		//let val = contractInstance.totalVotesFor.call(name).toString()
	    		let val = web3.fromWei(web3.eth.getBalance(key)).c[0];
				$("#" + candidates[name]).html(val);
    		}

    });

