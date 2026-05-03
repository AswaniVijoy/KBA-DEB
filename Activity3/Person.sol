// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Person {

    string public name;
    uint public age;

    function setPerson(string memory _name, uint _age) public {
        name = _name;
        age = _age;
    }

    function getPerson() public view returns (string memory, uint) {
        return (name, age);
    }
}