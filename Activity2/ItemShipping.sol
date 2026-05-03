// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ItemShipping {

    enum Status { Pending, Shipped, Delivered, Cancelled }

    Status public currentStatus;

    address public manager;

    constructor(address _manager) {
    manager = _manager;
}

    function shipItem() public {
        require(msg.sender == manager, "Only manager can call this");
        currentStatus = Status.Shipped;
    }

    function completeDelivery() public {
        require(msg.sender == manager, "Only manager can call this");
        currentStatus = Status.Delivered;
    }

    function cancelDelivery() public {
        require(msg.sender == manager, "Only manager can call this");
        currentStatus = Status.Cancelled;
    }

    function getStatus() public view returns (string memory) {
    if (currentStatus == Status.Pending) return "Pending";
    if (currentStatus == Status.Shipped) return "Shipped";
    if (currentStatus == Status.Delivered) return "Delivered";
    if (currentStatus == Status.Cancelled) return "Cancelled";
    return "";
}
}