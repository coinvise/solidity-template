import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";
import { ERC20 } from "../../src/types/ERC20";
import { Greeter } from "../../src/types/Greeter";
import { ERC20_DECIMALS, ERC20_NAME, ERC20_SYMBOL, GREETING } from "../../helpers/constants";
import { deployGreeter, deployERC20 } from "./deployers";
import { deployMockERC20 } from "./mocks";

type IntegrationFixtureReturnType = {
  greeter: Greeter;
  erc20: ERC20;
};

export async function integrationFixture(signers: Signer[]): Promise<IntegrationFixtureReturnType> {
  const deployer: Signer = signers[0];
  const erc20: ERC20 = await deployERC20(deployer, ERC20_NAME, ERC20_SYMBOL, ERC20_DECIMALS);
  const greeter: Greeter = await deployGreeter(deployer, GREETING);
  return { greeter, erc20 };
}

type UnitFixtureGreeterReturnType = {
  greeter: Greeter;
  erc20: MockContract;
};

export async function unitFixtureGreeter(signers: Signer[]): Promise<UnitFixtureGreeterReturnType> {
  const deployer: Signer = signers[0];
  const erc20: MockContract = await deployMockERC20(deployer, ERC20_NAME, ERC20_SYMBOL, ERC20_DECIMALS);
  const greeter: Greeter = await deployGreeter(deployer, GREETING);
  return { greeter, erc20 };
}
