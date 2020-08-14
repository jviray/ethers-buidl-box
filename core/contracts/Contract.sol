pragma solidity ^0.5.3;

/**
 * @title Contract
 * @dev Store & retreive value in a variable
 */

contract Contract {
    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retreive() public view returns (uint256) {
        return number;
    }
}
