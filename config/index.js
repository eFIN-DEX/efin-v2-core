const assert = require('assert');
const configPerNetwork = new Map();

const buildConf = (router, factory, bnb, efinPairHashCode, gasLimit) => ({
  router,
  factory,
  weth: bnb,
  efinPairHashCode,
  gasLimit,
});

// Testnet
configPerNetwork.set(
  'testnet',
  buildConf(
    '0x0', // Router
    '0x11207D137CE9F618c850c036B4E0C7A9558a8d42', // FactoryV2
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // BNB
    '0x825f7bd3f5deccab4ef9adb06501a35e8df4a3b46346c6a067612ea19b9696e2', // EFINV2Pair hash code
    '10000000', // Gas limit
  )
);

// Mainnet
configPerNetwork.set(
  'mainnet',
  buildConf(
    '0x0', // Router
    '0x0', // Factory
    '0x0', // BNB
    '0x0', // GetBytecode
    '6000000', // Gas limit
  )
);

module.exports = function (network) {
  const networkConfig = configPerNetwork.get(network.toLowerCase());
  if(networkConfig === undefined) {
    throw new Error(`Not config found for network ${network}`);
  }
  return networkConfig;
};
