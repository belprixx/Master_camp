# Project Block Vote

All you have to do is to modify the HttpProvider to adapt to yours.

```javascript
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
```

## Test with testrpc

To test with a simple [testrpc]() and deploy our smart contract

### Installation
```bash
$ sudo apt-get install build-essential python
$ npm install ethereumjs-testrpc web3
$ testrpc
```

testrpc will start and give 10 available accounts and its respective private keys.

### Deploy smartcontract

Make sure testrpc is still launch to deploy the smart contract you will need a tools named solc that will compile smart contract.

```bash
$ npm install solc
```

Now you will be able to start deploying and do other things on your accounts. Our smart contract is named Voting.sol.

Enter in a node console

```node
$ cd test_simple
$ node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
```
The last command will output all the functions available with web3, for exemple to see all our account available in testrpc will return something like this

```bash
> web3.eth.accounts

[ '0xa25637904649903e8598937c586e563cf86f5738',
  '0xcec65953de060d7ee6b9a23456853dfda03eb33e',
  '0x4b42b6cdac8d98727291c440e18b8f0e02f002b1',
  '0xf9bff94e01890f4217f21c2b4f69085d07649991',
  '0x8eb863ff7e744dc1bf07576a81f6d7ec0c475ecb',
  '0xaf28e80b7be656f94d45bdd2376d367c3e078f30',
  '0xdb395234ff59fa43282a1d56ae431310fb157582',
  '0x171927ad790cbd5a158dda00d5319dcf8871e9e3',
  '0x8d0d1b4ce79bca9af1b40f4f83cc987f513d6eaa',
  '0x2f6ed774b9b852f3c32b3a49920d13e7d1112019' ]
```
Now make sure you are on the good folder when you started the node console. We will compile the smartcontract.

```bash
> code = fs.readFileSync('Voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
```

Now we are able to use the smart contract and add it to our blockchain

```bash
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> VotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
> contractInstance = VotingContract.at(deployedContract.address)
```

If everything works well, the command `deployedContract.address` had give you an adress, this correspond to the smartcontract's adress. To quit node console, press twice `^c`.

### Use the smart contract in the Dapp

Now, you will have to add the smartcontracts' adress to our javascript.

Open the index.js and modify line 5 and set the adress that the command `deployedContract.address` and paste the address.

```javascript
contractInstance = VotingContract.at('SetYourAdressHere');
```