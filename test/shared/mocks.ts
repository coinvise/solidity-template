import type { Signer } from "@ethersproject/abstract-signer";
import { BigNumber } from "ethers";
import { Zero } from "@ethersproject/constants";
import { MockContract } from "ethereum-waffle";
import hre from "hardhat";
import type { Artifact } from "hardhat/types";

const { deployMockContract } = hre.waffle;

export async function deployMockERC20(
  deployer: Signer,
  name: string,
  symbol: string,
  decimals: BigNumber,
): Promise<MockContract> {
  const erc20Artifact: Artifact = await hre.artifacts.readArtifact("ERC20");
  const erc20: MockContract = await deployMockContract(deployer, erc20Artifact.abi);
  await erc20.mock.name.returns(name);
  await erc20.mock.symbol.returns(symbol);
  await erc20.mock.decimals.returns(decimals);
  await erc20.mock.totalSupply.returns(Zero);
  return erc20;
}
