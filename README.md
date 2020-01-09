[![Build Status](https://travis-ci.org/gnosis/solidity-data-structures.svg?branch=master)](https://travis-ci.org/gnosis/solidity-data-structures?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/gnosis/solidity-data-structures/badge.svg?branch=master)](https://coveralls.io/github/gnosis/solidity-data-structures?branch=master)

# solidity-data-structures
A collection of basic data structures implemented in solidity

### IterableAppendOnlySet
A set which allows to iterate over its contents. It does not allow containing 0 as an element and only supports insertions (no removals).

### IdToAddressBiMap
A library implementing a bijective mapping between integers (`uint16`) and addresses exposing a simple inteface for standard interactions (`insert`, `hasId`, `hasAddress`, `getId`, `getAddress`). This library eliminates the unpleasant case checking and index fiddling inherent to default values of a mapping.


### Merkle
Membership verificaiton for a leaf node is in a given Merkle tree given the index, root hash, and a proof.