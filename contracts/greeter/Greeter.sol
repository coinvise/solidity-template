// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import { IERC20 } from "../interfaces/IERC20.sol";

/// @notice Emitted when throwError() is called
error GreeterError();

/// @notice Emitted when the caller doesn't have enough greetings
error InsufficientGreetings();

/// @title Greeter
/// @author Sebastian T F
/// @notice Simple contract that interacts with an ERC20. This is not a secure contract. Do not use in production
/// @dev Contains a bunch of functions that access storage, throw custom error, transfer ERC20 tokens
contract Greeter {
    /// @notice Emitted when a user sends greetings
    /// @param _sender address of user who sent greetings
    /// @param _token token that was sent as greetings
    /// @param _amount amount of tokens that was sent as greetings
    event GreetingsSent(address _sender, IERC20 _token, uint256 _amount);

    /// @notice Emitted when a user withdraws greetings
    /// @param _withdrawer address of user who withdrew greetings
    /// @param _token token that was withdrawn from greetings
    /// @param _amount amount of tokens that was withdrawn from greetings
    event GreetingsWithdrawn(address _withdrawer, IERC20 _token, uint256 _amount);

    /// @notice Greeting message
    string public greeting;

    /// @notice Maps greetings sent by user as sender address => token address => amount
    mapping(address => mapping(address => uint256)) public greetingsSent;

    /// @notice Sets the greeting message
    /// @param _greeting string message to be set as greeting
    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    /// @notice Returns greeting message
    /// @return greeting_ The current greeting message
    function greet() public view returns (string memory greeting_) {
        return greeting;
    }

    /// @notice Sets the greeting message
    /// @param _greeting string message to be set as greeting
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    /// @notice Simply reverts with the custom error GreeterError()
    function throwError() external pure {
        revert GreeterError();
    }

    /// @notice Send greetings as tokens to the contract.
    ///         Transfers `_amount` of `_token` from `msg.sender` to contract
    /// @dev Does not use SafeMath or implement under/overflow checks, hence unsafe
    /// @param _token token to be sent
    /// @param _amount amount of tokens to be sent
    function sendGreeting(IERC20 _token, uint256 _amount) public {
        _token.transferFrom(msg.sender, address(this), _amount);
        greetingsSent[msg.sender][address(_token)] += _amount;
        emit GreetingsSent(msg.sender, _token, _amount);
    }

    /**
     * @notice Withdraw tokens previously sent as greetings.
     *         Reverts if caller hasn't sent enough greetings prior.
     *         Transfers `_amount` of `_token` from contract to `msg.sender`
     * @dev Does not use SafeMath or implement under/overflow checks, hence unsafe
     * @param _token token to be withdrawn
     * @param _amount amount of tokens to be withdrawn
     */
    function withdrawGreeting(IERC20 _token, uint256 _amount) public {
        if (greetingsSent[msg.sender][address(_token)] < _amount) {
            revert InsufficientGreetings();
        }
        greetingsSent[msg.sender][address(_token)] -= _amount;
        _token.transfer(msg.sender, _amount);
        emit GreetingsWithdrawn(msg.sender, _token, _amount);
    }

    /// @notice Helper function to get number of tokens sent by an address as greetings
    /// @param _sender address of the sender
    /// @param _token token of the sender's greetings
    /// @return greetingsSent_ remaining greetingsSent by `_sender`
    function greetings(address _sender, IERC20 _token) public view returns (uint256 greetingsSent_) {
        return greetingsSent[_sender][address(_token)];
    }
}
