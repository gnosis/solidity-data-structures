const Migrations = artifacts.require("Migrations");

const IterableSetLib = artifacts.require(".libraries/IterableAppendOnlySet.sol");
const IterableSet = artifacts.require(".libraries/wrappers/IterableAppendOnlySetWrapper.sol");

module.exports = async function (deployer) {
  deployer.deploy(Migrations);

  await deployer.deploy(IterableSetLib);
};
