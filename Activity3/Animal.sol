// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Animal {

    function sound() public pure virtual returns (string memory) {
        return "Some generic animal sound";
    }
}