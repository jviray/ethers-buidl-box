const { ethers, Wallet } = require('ethers');
const { abi, bytecode } = require('./compile');
require('dotenv').config({ path: __dirname + '/../.env' });

const provider = ethers.getDefaultProvider('kovan', {
  infura: 'https://kovan.infura.io/v3/3e1cb74e7369425285a5a988873a54ba',
});

const contractAbi = abi;
const contractBytecode = bytecode;

// Confirm secret mnemonic seed phrase is set in .env file
const walletMnemonic = Wallet.fromMnemonic(process.env.MNEMONIC_PHRASE);
const signerWallet = walletMnemonic.connect(provider);

const deploy = async () => {
  console.log(
    'Attempting to deploy contract from account',
    signerWallet.address
  );

  try {
    const factory = new ethers.ContractFactory(
      contractAbi,
      contractBytecode,
      signerWallet
    );

    // Add argumnets to deploy() if needed
    const contract = await factory.deploy();
    const contractAddress = contract.address;
    console.log('Contract deployed to', contractAddress);
  } catch (error) {
    console.log(error);
  }
};

deploy();

// Contract deployed to 0x1b2D5c7545110CFD80E08f8e0A7201bb542C649f
