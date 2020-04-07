pragma solidity ^0.5.0;

import "../IterableAppendOnlySet.sol";


contract IterableAppendOnlySetWrapper {
    IterableAppendOnlySet.Data private data;
    using IterableAppendOnlySet for IterableAppendOnlySet.Data;

    function insert(address value) public returns (bool) {
        return data.insert(value);
    }

    function contains(address value) public view returns (bool) {
        return data.contains(value);
    }

    function first() public view returns (address) {
        return data.first();
    }

    function last() public view returns (address) {
        return data.last;
    }

    function size() public view returns (uint96) {
        return data.size;
    }

    function next(address value) public view returns (address) {
        return data.next(value);
    }
}