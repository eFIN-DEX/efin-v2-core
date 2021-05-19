const assert = require('assert');
// Smart contracts

// Util classes
const EFINV2Factory = artifacts.require("EFINV2Factory.sol");
const EFINV2Pair = artifacts.require("EFINV2Pair.sol");

/** Process parameters: */

// Testnet: 0xCc261efd1946f1810959B2cbbDbD7057d39b0FCa
// Mainnet: 0x3b5238312DcBb5ADEdA7470109e60c39CF9ad406
const efinFactoryAddress = '0x3b5238312DcBb5ADEdA7470109e60c39CF9ad406';

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