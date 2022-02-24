// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import { IERC20 } from "../token/ERC20.sol";

error GreeterError();
error InsufficientGreetings();

contract Greeter {
    event GreetingsSent(address _sender, IERC20 _token, uint256 _amount);
    event GreetingsWithdrawn(address _withdrawer, IERC20 _token, uint256 _amount);

    string public greeting;

    mapping(address => mapping(address => uint256)) public greetingsSent;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory greeting_) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function throwError() external pure {
        revert GreeterError();
    }

    function sendGreeting(IERC20 _token, uint256 _amount) public {
        _token.transferFrom(msg.sender, address(this), _amount);
        greetingsSent[msg.sender][address(_token)] += _amount;
        emit GreetingsSent(msg.sender, _token, _amount);
    }

    function withdrawGreeting(IERC20 _token, uint256 _amount) public {
        if (greetingsSent[msg.sender][address(_token)] < _amount) {
            revert InsufficientGreetings();
        }
        greetingsSent[msg.sender][address(_token)] -= _amount;
        _token.transfer(msg.sender, _amount);
        emit GreetingsWithdrawn(msg.sender, _token, _amount);
    }

    function greetings(address _sender, IERC20 _token) public view returns (uint256 greetingsSent_) {
        return greetingsSent[_sender][address(_token)];
    }
}
