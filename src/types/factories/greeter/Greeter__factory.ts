/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Greeter, GreeterInterface } from "../../greeter/Greeter";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "GreeterError",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientGreetings",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "GreetingsSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_withdrawer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "GreetingsWithdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "greeting_",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "greeting",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
    ],
    name: "greetings",
    outputs: [
      {
        internalType: "uint256",
        name: "greetingsSent_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "greetingsSent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "sendGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "throwError",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000ad338038062000ad3833981016040819052620000349162000060565b6000620000428282620001c4565b505062000290565b634e487b7160e01b600052604160045260246000fd5b600060208083850312156200007457600080fd5b82516001600160401b03808211156200008c57600080fd5b818501915085601f830112620000a157600080fd5b815181811115620000b657620000b66200004a565b604051601f8201601f19908116603f01168101908382118183101715620000e157620000e16200004a565b816040528281528886848701011115620000fa57600080fd5b600093505b828410156200011e5784840186015181850187015292850192620000ff565b600086848301015280965050505050505092915050565b600181811c908216806200014a57607f821691505b6020821081036200016b57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001bf57600081815260208120601f850160051c810160208610156200019a5750805b601f850160051c820191505b81811015620001bb57828155600101620001a6565b5050505b505050565b81516001600160401b03811115620001e057620001e06200004a565b620001f881620001f1845462000135565b8462000171565b602080601f831160018114620002305760008415620002175750858301515b600019600386901b1c1916600185901b178555620001bb565b600085815260208120601f198616915b82811015620002615788860151825594840194600190910190840162000240565b5085821015620002805787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61083380620002a06000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063a41368621161005b578063a4136862146100fb578063cfae32171461010e578063ef690cc014610123578063fa86ccc71461012b57600080fd5b80632f7643a81461008d5780633703ed571461009757806394bd77da146100aa5780639c1b4448146100e8575b600080fd5b61009561013e565b005b6100956100a53660046104fe565b610157565b6100d56100b836600461052a565b600160209081526000928352604080842090915290825290205481565b6040519081526020015b60405180910390f35b6100d56100f636600461052a565b610293565b610095610109366004610579565b6102c0565b6101166102d0565b6040516100df919061062a565b610116610362565b6100956101393660046104fe565b6103f0565b60405163c8508fc360e01b815260040160405180910390fd5b3360009081526001602090815260408083206001600160a01b038616845290915290205481111561019b576040516349752c8760e01b815260040160405180910390fd5b3360009081526001602090815260408083206001600160a01b0386168452909152812080548392906101ce90849061068e565b909155505060405163a9059cbb60e01b8152336004820152602481018290526001600160a01b0383169063a9059cbb906044016020604051808303816000875af1158015610220573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024491906106a1565b50604080513381526001600160a01b03841660208201529081018290527f6ac5432f2eb9c371a50ac18628c45fcf31feaf327ff7a7612f7129cbb04af7cb906060015b60405180910390a15050565b6001600160a01b038083166000908152600160209081526040808320938516835292905220545b92915050565b60006102cc8282610753565b5050565b6060600080546102df906106ca565b80601f016020809104026020016040519081016040528092919081815260200182805461030b906106ca565b80156103585780601f1061032d57610100808354040283529160200191610358565b820191906000526020600020905b81548152906001019060200180831161033b57829003601f168201915b5050505050905090565b6000805461036f906106ca565b80601f016020809104026020016040519081016040528092919081815260200182805461039b906106ca565b80156103e85780601f106103bd576101008083540402835291602001916103e8565b820191906000526020600020905b8154815290600101906020018083116103cb57829003601f168201915b505050505081565b6040516323b872dd60e01b8152336004820152306024820152604481018290526001600160a01b038316906323b872dd906064016020604051808303816000875af1158015610443573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046791906106a1565b503360009081526001602090815260408083206001600160a01b03861684529091528120805483929061049b908490610813565b9091555050604080513381526001600160a01b03841660208201529081018290527f3f4b14a5486287bb98c5ee043f0b5f1e4d6f054b8d725cdcb14c607e7e5eefae90606001610287565b6001600160a01b03811681146104fb57600080fd5b50565b6000806040838503121561051157600080fd5b823561051c816104e6565b946020939093013593505050565b6000806040838503121561053d57600080fd5b8235610548816104e6565b91506020830135610558816104e6565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561058b57600080fd5b813567ffffffffffffffff808211156105a357600080fd5b818401915084601f8301126105b757600080fd5b8135818111156105c9576105c9610563565b604051601f8201601f19908116603f011681019083821181831017156105f1576105f1610563565b8160405282815287602084870101111561060a57600080fd5b826020860160208301376000928101602001929092525095945050505050565b600060208083528351808285015260005b818110156106575785810183015185820160400152820161063b565b506000604082860101526040601f19601f8301168501019250505092915050565b634e487b7160e01b600052601160045260246000fd5b818103818111156102ba576102ba610678565b6000602082840312156106b357600080fd5b815180151581146106c357600080fd5b9392505050565b600181811c908216806106de57607f821691505b6020821081036106fe57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561074e57600081815260208120601f850160051c8101602086101561072b5750805b601f850160051c820191505b8181101561074a57828155600101610737565b5050505b505050565b815167ffffffffffffffff81111561076d5761076d610563565b6107818161077b84546106ca565b84610704565b602080601f8311600181146107b6576000841561079e5750858301515b600019600386901b1c1916600185901b17855561074a565b600085815260208120601f198616915b828110156107e5578886015182559484019460019091019084016107c6565b50858210156108035787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b808201808211156102ba576102ba61067856fea164736f6c6343000812000a";

type GreeterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GreeterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Greeter__factory extends ContractFactory {
  constructor(...args: GreeterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _greeting: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Greeter> {
    return super.deploy(_greeting, overrides || {}) as Promise<Greeter>;
  }
  override getDeployTransaction(
    _greeting: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_greeting, overrides || {});
  }
  override attach(address: string): Greeter {
    return super.attach(address) as Greeter;
  }
  override connect(signer: Signer): Greeter__factory {
    return super.connect(signer) as Greeter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GreeterInterface {
    return new utils.Interface(_abi) as GreeterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Greeter {
    return new Contract(address, _abi, signerOrProvider) as Greeter;
  }
}
