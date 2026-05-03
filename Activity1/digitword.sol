// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitWord{
    function Word(uint a) public pure returns(string memory){
        if(a==0){
            return "Zero";
        }
        else if(a==1){
            return "One";
        }
        else if(a==2){
            return "Two";
        }
        else if(a==3){
            return "Three";
        }
        else if(a==4){
            return "Four";
        }
        else if(a==5){
            return "Five";
        }
        else if(a==6){
            return "Six";
        }
        else if(a==7){
            return "Seven";
        }else if(a==8){
            return "Eight";
        }else if(a==9){
            return "Nine";
        }
        else{
            return "Invalid Input";
        }
    }
}