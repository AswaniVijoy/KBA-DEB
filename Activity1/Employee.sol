// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Employee {

    address public admin;

    struct EmployeeDetails {
        string name;
        string department;
        string designation;
        uint salary;
        address payable wallet;
    }

    EmployeeDetails public employee;

    constructor() {
        admin = msg.sender;
    }

    function setEmployee(
        string memory _name,
        string memory _department,
        string memory _designation,
        uint _salary,
        address payable _wallet
    ) public {
        employee = EmployeeDetails(_name, _department, _designation, _salary, _wallet);
    }

    function getDetails() public view returns (
        string memory,
        string memory,
        string memory,
        uint
    ) {
        return (
            employee.name,
            employee.department,
            employee.designation,
            employee.salary
        );
    }

    function payEmployee() public payable {
        require(msg.sender == admin, "Only admin");
        require(msg.value >= employee.salary, "Not enough Ether");

        (bool success, ) = employee.wallet.call{value: employee.salary}("");
        require(success, "Payment failed");
    }
}