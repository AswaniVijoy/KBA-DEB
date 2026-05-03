// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Animal.sol";

contract Dog is Animal {

    function sound() public pure override returns (string memory) {
        return "bark";
    }
}