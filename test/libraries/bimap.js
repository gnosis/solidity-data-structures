const IdToAddressBiMapWrapper = artifacts.require("IdToAddressBiMapWrapper")
const IdToAddressBiMap = artifacts.require("IdToAddressBiMap")

const truffleAssert = require("truffle-assertions")


contract("BiMap", async (accounts) => {

  describe("All BiMap Functions", () => {
    
    it("admits bijectivity properties", async () => {
      const lib = await IdToAddressBiMap.new()
      await IdToAddressBiMapWrapper.link(IdToAddressBiMap, lib.address)
      const map = await IdToAddressBiMapWrapper.new()

      // 0 and accounts[0] not assigned.
      assert.equal(false, await map.hasId(0))
      assert.equal(false, await map.hasAddress(accounts[0]))

      // register account[0] at slot 0
      await map.insert(0, accounts[0])

      // 0 and accounts[0] are both assigned.
      assert.equal(true, await map.hasId(0))
      assert.equal(true, await map.hasAddress(accounts[0]))

      // 0 <--> accounts[0] 
      assert.equal(accounts[0], await map.getAddressAt(0))
      assert.equal(0, (await map.getId(accounts[0])).toNumber())

      // ID-1 and account[1] not registered.
      await truffleAssert.reverts(map.getId(accounts[1]))
      await truffleAssert.reverts(map.getAddressAt(1))

      // Don't allow insert if either id or address is already part of the map.
      assert.equal(false, await map.insert.call(1, accounts[0]))
      assert.equal(false, await map.insert.call(0, accounts[1]))
    })
    it("does not allow insertion of address(0)", async () => {
      const lib = await IdToAddressBiMap.new()
      await IdToAddressBiMapWrapper.link(IdToAddressBiMap, lib.address)
      const map = await IdToAddressBiMapWrapper.new()

      await truffleAssert.reverts(
        map.insert(42, "0x0000000000000000000000000000000000000000"),
        "Cannot insert zero address"
      )
    })
    it("does not allow insertion of max uint16", async () => {
      const lib = await IdToAddressBiMap.new()
      await IdToAddressBiMapWrapper.link(IdToAddressBiMap, lib.address)
      const map = await IdToAddressBiMapWrapper.new()

      await truffleAssert.reverts(
        map.insert(2 ** 16 - 1, accounts[0]),
        "Cannot insert max uint16"
      )
    })
  })
})