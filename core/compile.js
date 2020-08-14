// JS can't import or require in Solidity (.sol) files so the contents
// of the Solidity contracts have to be read into this file

// Helps build a path to the smart contract in the directory
const path = require('path');
// Used to read-in the contents of the contract
const fs = require('fs');
const solc = require('solc');

// *** Replace all instances of 'Contract' below with the name of your contract *** //
const contractPath = path.resolve(__dirname, 'contracts', 'Contract.sol');
const source = fs.readFileSync(contractPath, 'UTF-8');

var input = {
  language: 'Solidity',
  sources: {
    'Contract.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const compiledContract = output.contracts['Contract.sol']['Contract'];

module.exports = {
  abi: compiledContract.abi,
  bytecode: compiledContract.evm.bytecode.object,
};

// Resources:
// - https://github.com/ethereum/solc-js
// - https://ethereum.stackexchange.com/questions/68354/how-to-compile-solidity-0-5-5-contract-with-node-js
