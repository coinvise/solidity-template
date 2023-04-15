import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";
import type { MockContract } from "@ethereum-waffle/mock-contract";
import { ERC20Token } from "../../src/types/test/ERC20Token";
import { Greeter } from "../../src/types/greeter";
import { ERC20_TOKEN_DECIMALS, ERC20_TOKEN_NAME, ERC20_TOKEN_SYMBOL, GREETING } from "../../helpers/constants";
import { deployGreeter, deployERC20Token } from "./deployers";
import { deployMockERC20Token } from "./mocks";

type IntegrationFixtureReturnType = {
  greeter: Greeter;
  erc20Token: ERC20Token;
};

export async function integrationFixture(): Promise<IntegrationFixtureReturnType> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const deployer: SignerWithAddress = signers[0];

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

export async function unitFixtureGreeter(): Promise<UnitFixtureGreeterReturnType> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const deployer: SignerWithAddress = signers[0];

  const erc20Token: MockContract = await deployMockERC20Token(
    deployer,
    ERC20_TOKEN_NAME,
    ERC20_TOKEN_SYMBOL,
    ERC20_TOKEN_DECIMALS,
  );
  const greeter: Greeter = await deployGreeter(deployer, GREETING);
  return { greeter, erc20Token };
}
