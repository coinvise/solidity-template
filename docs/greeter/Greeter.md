# Greeter

_Sebastian T F_

> Greeter

Simple contract that interacts with an ERC20. This is not a secure contract. Do not use in production

_Contains a bunch of functions that access storage, throw custom error, transfer ERC20 tokens_

## Methods

### greet

```solidity
function greet() external view returns (string greeting_)
```

Returns greeting message

#### Returns

| Name       | Type   | Description                  |
| ---------- | ------ | ---------------------------- |
| greeting\_ | string | The current greeting message |

### greeting

```solidity
function greeting() external view returns (string)
```

Greeting message

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | string | undefined   |

### greetings

```solidity
function greetings(address _sender, contract IERC20 _token) external view returns (uint256 greetingsSent_)
```

Helper function to get number of tokens sent by an address as greetings

#### Parameters

| Name     | Type            | Description                         |
| -------- | --------------- | ----------------------------------- |
| \_sender | address         | address of the sender               |
| \_token  | contract IERC20 | token of the sender&#39;s greetings |

#### Returns

| Name            | Type    | Description                          |
| --------------- | ------- | ------------------------------------ |
| greetingsSent\_ | uint256 | remaining greetingsSent by `_sender` |

### greetingsSent

```solidity
function greetingsSent(address, address) external view returns (uint256)
```

Maps greetings sent by user as sender address =&gt; token address =&gt; amount

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |
| \_1  | address | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### sendGreeting

```solidity
function sendGreeting(contract IERC20 _token, uint256 _amount) external nonpayable
```

Send greetings as tokens to the contract. Transfers `_amount` of `_token` from `msg.sender` to contract

_Does not use SafeMath or implement under/overflow checks, hence unsafe_

#### Parameters

| Name     | Type            | Description                 |
| -------- | --------------- | --------------------------- |
| \_token  | contract IERC20 | token to be sent            |
| \_amount | uint256         | amount of tokens to be sent |

### setGreeting

```solidity
function setGreeting(string _greeting) external nonpayable
```

Sets the greeting message

#### Parameters

| Name       | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| \_greeting | string | string message to be set as greeting |

### throwError

```solidity
function throwError() external pure
```

Simply reverts with the custom error GreeterError()

### withdrawGreeting

```solidity
function withdrawGreeting(contract IERC20 _token, uint256 _amount) external nonpayable
```

Withdraw tokens previously sent as greetings. Reverts if caller hasn&#39;t sent enough greetings prior. Transfers `_amount` of `_token` from contract to `msg.sender`

_Does not use SafeMath or implement under/overflow checks, hence unsafe_

#### Parameters

| Name     | Type            | Description                      |
| -------- | --------------- | -------------------------------- |
| \_token  | contract IERC20 | token to be withdrawn            |
| \_amount | uint256         | amount of tokens to be withdrawn |

## Events

### GreetingsSent

```solidity
event GreetingsSent(address _sender, contract IERC20 _token, uint256 _amount)
```

Emitted when a user sends greetings

#### Parameters

| Name     | Type            | Description                                 |
| -------- | --------------- | ------------------------------------------- |
| \_sender | address         | address of user who sent greetings          |
| \_token  | contract IERC20 | token that was sent as greetings            |
| \_amount | uint256         | amount of tokens that was sent as greetings |

### GreetingsWithdrawn

```solidity
event GreetingsWithdrawn(address _withdrawer, contract IERC20 _token, uint256 _amount)
```

Emitted when a user withdraws greetings

#### Parameters

| Name         | Type            | Description                                        |
| ------------ | --------------- | -------------------------------------------------- |
| \_withdrawer | address         | address of user who withdrew greetings             |
| \_token      | contract IERC20 | token that was withdrawn from greetings            |
| \_amount     | uint256         | amount of tokens that was withdrawn from greetings |

## Errors

### GreeterError

```solidity
error GreeterError()
```

Emitted when throwError() is called

### InsufficientGreetings

```solidity
error InsufficientGreetings()
```

Emitted when the caller doesn&#39;t have enough greetings
