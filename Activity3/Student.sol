// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Person.sol";

contract Student is Person {

    uint public studentID;

    function setStudentID(uint _studentID) public {
        studentID = _studentID;
    }

    function getStudentDetails() public view returns (string memory, uint, uint) {
        return (name, age, studentID);
    }
}