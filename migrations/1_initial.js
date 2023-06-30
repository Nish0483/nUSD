const nUSD = artifacts.require("nUSD");

module.exports = function(deployer) {
  deployer.deploy(nUSD);
};
