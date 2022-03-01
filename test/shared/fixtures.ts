import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";
import { ERC20Token } from "../../src/types/ERC20Token";
import { Greeter } from "../../src/types/Greeter";
import { ERC20_TOKEN_DECIMALS, ERC20_TOKEN_NAME, ERC20_TOKEN_SYMBOL, GREETING } from "../../helpers/constants";
import { deployGreeter, deployERC20Token } from "./deployers";
import { deployMockERC20Token } from "./mocks";

type IntegrationFixtureReturnType = {
  greeter: Greeter;
  erc20Token: ERC20Token;
};

export async function integrationFixture(signers: Signer[]): Promise<IntegrationFixtureReturnType> {
  const deployer: Signer = signers[0];
  const erc20Token: ERC20Token = await deployERC20Token(
    deployer,
    ERC20_TOKEN_NAME,
    ERC20_TOKEN_SYMBOL,
    ERC20_TOKEN_DECIMALS,
  );
  const greeter: Greeter = await deployGreeter(deployer, GREETING);
  return { greeter, erc20Token };
}

type UnitFixtureGreeterReturnType = {
  greeter: Greeter;
  erc20Token: MockContract;
};

export async function unitFixtureGreeter(signers: Signer[]): Promise<UnitFixtureGreeterReturnType> {
  const deployer: Signer = signers[0];
  const erc20Token: MockContract = await deployMockERC20Token(
    deployer,
    ERC20_TOKEN_NAME,
    ERC20_TOKEN_SYMBOL,
    ERC20_TOKEN_DECIMALS,
  );
  const greeter: Greeter = await deployGreeter(deployer, GREETING);
  return { greeter, erc20Token };
}
