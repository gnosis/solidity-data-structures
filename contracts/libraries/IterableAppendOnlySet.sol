pragma solidity ^0.5.0;


library IterableAppendOnlySet {
    struct Data {
        mapping(address => address) nextMap;
        address last;
    }

    function insert(Data storage self, address value) public returns (bool) {
        if (contains(self, value)) {
            return false;
        }
        self.nextMap[self.last] = value;
        self.last = value;
        return true;
    }

    function contains(Data storage self, address value) public view returns (bool) {
        require(value != address(0), "Inserting address(0) is not supported");
        return self.nextMap[value] != address(0) || (self.last == value);
    }

    function first(Data storage self) public view returns (address) {
        require(self.last != address(0), "Trying to get first from empty set");
        return self.nextMap[address(0)];
    }

    function next(Data storage self, address value) public view returns (address) {
        require(contains(self, value), "Trying to get next of non-existent element");
        require(value != self.last, "Trying to get next of last element");
        return self.nextMap[value];
    }

    function size(Data storage self) public view returns (uint256) {
        if (self.last == address(0)) {
            return 0;
        }
        uint256 count = 1;
        address current = first(self);
        while (current != self.last) {
            current = next(self, current);
            count++;
        }
        return count;
    }

    function atIndex(Data storage self, uint256 index) public view returns (address) {
        require(index < size(self), "requested index too large");
        address res = first(self);
        for (uint256 i = 0; i < index; i++) {
            res = next(self, res);
        }
        return res;
    }
}