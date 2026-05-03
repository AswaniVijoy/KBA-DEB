// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Bank.sol";

contract User is Bank {

    function depositToBank() public payable {
        deposit();   
    }

    function checkMyBalance() public view returns (uint) {
        return getBalance();
    }
    function userWithdraw(uint _amount) public payable  {
    withdraw(_amount);
    }
}