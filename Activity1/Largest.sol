// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LargestNumber{
    function Largest(uint a, uint b, uint c) public pure returns(uint){
        if(a >= b && a >= c){
            return a;
        }
        else if(b >= a && b >= c){
            return b;
        }
        else{
            return c;
        }
    }
}