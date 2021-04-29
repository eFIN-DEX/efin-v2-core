const EFINV2Factory = artifacts.require("EFINV2Factory.sol");

module.exports = async function (deployer, network, accounts) {
  const owner = accounts[0];

  console.log(`Using network: ${network}`);
  console.log(`Using account: ${owner}`);

  // Deploying Factory contract.
  await deployer.deploy(EFINV2Factory, owner);
  const factory = await EFINV2Factory.deployed();

  const initCodeEFINPairHash = await factory.INIT_CODE_PAIR_HASH();
  console.log(`EFINV2Pair code hash: ${initCodeEFINPairHash}`)

  console.log(`EFINV2Factory deployed at address: ${factory.address}`);
};