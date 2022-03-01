import type { Signer } from "@ethersproject/abstract-signer";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { Greeter } from "../../src/types/Greeter";
import { ERC20Token } from "../../src/types/ERC20Token";
import { BigNumber } from "ethers";

const { deployContract } = waffle;

export async function deployGreeter(deployer: Signer, greeting: string): Promise<Greeter> {
  const greeterArtifact: Artifact = await artifacts.readArtifact("Greeter");
  const greeter: Greeter = <Greeter>await deployContract(deployer, greeterArtifact, [greeting]);
  return greeter;
}

export async function deployERC20Token(
  deployer: Signer,
  name: string,
  symbol: string,
  decimals: BigNumber,
): Promise<ERC20Token> {
  const erc20TokenArtifact: Artifact = await artifacts.readArtifact("ERC20Token");
  const erc20Token: ERC20Token = <ERC20Token>(
    await deployContract(deployer, erc20TokenArtifact, [name, symbol, decimals])
  );
  return erc20Token;
}
