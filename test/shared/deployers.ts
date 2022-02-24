import type { Signer } from "@ethersproject/abstract-signer";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { Greeter } from "../../src/types/Greeter";
import { ERC20 } from "../../src/types/ERC20";
import { BigNumber } from "ethers";

const { deployContract } = waffle;

export async function deployGreeter(deployer: Signer, greeting: string): Promise<Greeter> {
  const greeterArtifact: Artifact = await artifacts.readArtifact("Greeter");
  const greeter: Greeter = <Greeter>await deployContract(deployer, greeterArtifact, [greeting]);
  return greeter;
}

export async function deployERC20(deployer: Signer, name: string, symbol: string, decimals: BigNumber): Promise<ERC20> {
  const erc20Artifact: Artifact = await artifacts.readArtifact("ERC20");
  const erc20: ERC20 = <ERC20>await deployContract(deployer, erc20Artifact, [name, symbol, decimals]);
  return erc20;
}
