const Migrations = artifacts.require("Migrations")

const BiMap = artifacts.require(".libraries/IdToAddressBiMap.sol")
const IterableSetLib = artifacts.require(
  ".libraries/IterableAppendOnlySet.sol"
)

module.exports = async function(deployer) {
  await deployer.deploy(Migrations)

  await deployer.deploy(BiMap)
  await deployer.deploy(IterableSetLib)
};
