const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const mnemonic = process.env.MNEMONIC;
const privateKey = process.env.ALCHEMY_API;

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic,`https://eth-sepolia.g.alchemy.com/v2/${privateKey}`),
      network_id:11155111, //sepolia netwok_id
      gasPrice: 36510211118, // Gas price in wei (adjust to your needs)
      confirmations: 2, // this is a must field
      timeoutBlocks: 20,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true ,
      gas: 8000000,
    },
    goreli: {
      provider: function() {
        return new HDWalletProvider(mnemonic,`https://eth-goerli.g.alchemy.com/v2/${privateKey}`);
      },
      network_id: 5, // Görli network ID
      gas: 8000000,// Adjust the gas limit if needed
      confirmations: 2, // this is a must field
      timeoutBlocks: 12,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Solidity compiler version
    },
  },
};
