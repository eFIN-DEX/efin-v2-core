const assert = require('assert');
// Smart contracts

// Util classes
const EFINV2Factory = artifacts.require("EFINV2Factory.sol");
const EFINV2Pair = artifacts.require("EFINV2Pair.sol");

/** Process parameters: */

// Testnet: 0x11207D137CE9F618c850c036B4E0C7A9558a8d42
// Mainnet: 0x0
const efinFactoryAddress = '0x11207D137CE9F618c850c036B4E0C7A9558a8d42';

module.exports = async (callback) => {
    try {
        assert(efinFactoryAddress, 'EFINRouter address is undefined.');
        assert(efinFactoryAddress !== '', 'EFINRouter address is empty.');

        const efinFactory = await EFINV2Factory.at(efinFactoryAddress);
        
        const codeEFINPairHash = await efinFactory.INIT_CODE_PAIR_HASH();

        const efinPairBytecode = EFINV2Pair.bytecode;

        const web3CodeEFINPairHash = web3.utils.soliditySha3(efinPairBytecode);
        console.log(`EFINV2Pair Bytecode hash (from Web3js):      ${web3CodeEFINPairHash}`);
        console.log(`EFINV2Pair Bytecode hash (from EFINV2Factory): ${codeEFINPairHash}`);

        assert.strictEqual(codeEFINPairHash, web3CodeEFINPairHash, "EFINV2Pair contract hashes NOT match: web3JS <> contract call");
        console.log('>>>> The script finished successfully. <<<<');
        callback();
    } catch (error) {
        console.log(error);
        callback(error);
    }
};