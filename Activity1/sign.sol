// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SignNumber{
    function Sign(int a) public pure returns(string memory){
        if(a>0){
            return "Positive Number";
        }
        else if(a<0){
            return "Negetive Number";
        }
        else{
            return "Zero";
        }
    }
}