// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventRegistry {

    address[] public guestList;
    uint public maxGuests = 10;
    
    function register() public {
        require(guestList.length < maxGuests, "Guest limit reached");
        guestList.push(msg.sender);
    }
    
    function getGuestCount() public view returns (uint) {
        return guestList.length;
    }
}