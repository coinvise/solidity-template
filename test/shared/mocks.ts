import type { Signer } from "@ethersproject/abstract-signer";
import { BigNumber } from "ethers";
import { Zero } from "@ethersproject/constants";
import { MockContract } from "ethereum-waffle";
import hre from "hardhat";
import type { Artifact } from "hardhat/types";

const { deployMockContract } = hre.waffle;

export async function deployMockERC20Token(
  deployer: Signer,
  name: string,
  symbol: string,
  decimals: BigNumber,
): Promise<MockContract> {
  const erc20TokenArtifact: Artifact = await hre.artifacts.readArtifact("ERC20Token");
  const erc20Token: MockContract = await deployMockContract(deployer, erc20TokenArtifact.abi);
  await erc20Token.mock.name.returns(name);
  await erc20Token.mock.symbol.returns(symbol);
  await erc20Token.mock.decimals.returns(decimals);
  await erc20Token.mock.totalSupply.returns(Zero);
  return erc20Token;
}
