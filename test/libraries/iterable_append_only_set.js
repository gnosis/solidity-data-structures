const IterableSetLib = artifacts.require(".libraries/IterableAppendOnlySet.sol")
const IterableSet = artifacts.require(
  ".libraries/wrappers/IterableAppendOnlySetWrapper.sol"
)

const truffleAssert = require("truffle-assertions")

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

async function getSetContent(set) {
  const last = await set.last()
  const result = []
  if (last != ZERO_ADDRESS) {
    let current = await set.first()
    result.push(current)
    while (current != last) {
      current = await set.next(current)
      result.push(current)
    }
  }
  return result
}

contract("IterableSet", function(accounts) {
  beforeEach(async () => {
    const lib = await IterableSetLib.new()
    await IterableSet.link(IterableSetLib, lib.address)
  })

  it("should contain the added values", async () => {
    const set = await IterableSet.new()
    assert.deepEqual(await getSetContent(set), [])

    assert.equal(
      await set.contains(accounts[0]),
      false,
      "The element should not be there"
    )
    await set.insert(accounts[0])

    assert.equal(
      await set.contains(accounts[0]),
      true,
      "The element should be there"
    )
    assert.deepEqual(await getSetContent(set), accounts.slice(0, 1))
  })

  it("should keep track of the size", async () => {
    const set = await IterableSet.new()
    assert.equal((await set.size()).toNumber(), 0)

    await set.insert(accounts[0])
    assert.equal((await set.size()).toNumber(), 1)

    await set.insert(accounts[1])
    assert.equal((await set.size()).toNumber(), 2)

    // re-add already existing address[0]
    await set.insert(accounts[0])
    assert.equal((await set.size()).toNumber(), 2)
  })

  it("should insert the same value only once", async () => {
    const set = await IterableSet.new()

    assert.equal(
      await set.insert.call(accounts[0]),
      true,
      "First insert should insert"
    )
    await set.insert(accounts[0])
    assert.deepEqual(await getSetContent(set), accounts.slice(0, 1))

    assert.equal(
      await set.insert.call(accounts[0]),
      false,
      "Second insert should do nothing"
    )
    await set.insert(accounts[0])
    assert.deepEqual(await getSetContent(set), accounts.slice(0, 1))
  })

  it("should return first and last element", async () => {
    const set = await IterableSet.new()

    await set.insert(accounts[0])
    assert.equal(await set.first(), accounts[0])
    assert.equal(await set.last(), accounts[0])

    await set.insert(accounts[1])
    assert.equal(await set.first(), accounts[0])
    assert.equal(await set.last(), accounts[1])
  })

  it("should allow to iterate over content", async () => {
    const set = await IterableSet.new()

    await set.insert(accounts[0])
    await set.insert(accounts[1])
    await set.insert(accounts[2])

    const first = await set.first()
    const second = await set.next(first)
    const third = await set.next(second)

    assert.equal(first, accounts[0])
    assert.equal(second, accounts[1])
    assert.equal(third, accounts[2])
  })

  it("doesn't allow to insert 0 address", async () => {
    const set = await IterableSet.new()
    await truffleAssert.reverts(set.insert(ZERO_ADDRESS))
  })

  it("cannot get first of empty list", async () => {
    const set = await IterableSet.new()
    await truffleAssert.reverts(set.first())
  })

  it("cannot get next of non-existent element", async () => {
    const set = await IterableSet.new()

    await set.insert(accounts[0])
    await truffleAssert.reverts(set.next(accounts[1]))
  })

  it("cannot get next of last element", async () => {
    const set = await IterableSet.new()

    await set.insert(accounts[0])
    await truffleAssert.reverts(set.next(accounts[0]))
  })
})
