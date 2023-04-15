import { ethers } from "hardhat";
import { Greeter } from "../../src/types/greeter";
import { ERC20Token } from "../../src/types/test/ERC20Token";
import { BigNumber, Signer } from "ethers";
import { Greeter__factory } from "../../src/types/factories/greeter";
import { ERC20Token__factory } from "../../src/types/factories/test";

export async function deployGreeter(deployer: Signer, greeting: string): Promise<Greeter> {
  const greeterFactory: Greeter__factory = <Greeter__factory>await ethers.getContractFactory("Greeter");
  const greeter: Greeter = <Greeter>await greeterFactory.connect(deployer).deploy(greeting);
  return greeter;
}

export async function deployERC20Token(
  deployer: Signer,
  name: string,
  symbol: string,
  decimals: BigNumber,
): Promise<ERC20Token> {
  const erc20TokenFactory: ERC20Token__factory = <ERC20Token__factory>await ethers.getContractFactory("ERC20Token");
  const erc20Token: ERC20Token = <ERC20Token>await erc20TokenFactory.connect(deployer).deploy(name, symbol, decimals);
  return erc20Token;
}
