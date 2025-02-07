import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { MockContract } from "@ethereum-waffle/mock-contract";

import { ERC20Token } from "../../src/types/test/ERC20Token";
import { Greeter } from "../../src/types/greeter";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  interface Context {
    contracts: Contracts;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    mocks: Mocks;
    signers: Signers;
  }
}

export interface Contracts {
  greeter: Greeter;
  erc20Token: ERC20Token;
}

export interface Mocks {
  greeter: MockContract;
  erc20Token: MockContract;
}

export interface Signers {
  alice: SignerWithAddress;
  bob: SignerWithAddress;
  carol: SignerWithAddress;
  david: SignerWithAddress;
  eve: SignerWithAddress;
}
