import { expect } from "chai";
import { parseUnits } from "ethers/lib/utils";
import { GREETING } from "../../../helpers/constants";
import { unitFixtureGreeter } from "../../shared/fixtures";

export function unitTestGreeter(): void {
  describe("Greeter", function () {
    beforeEach(async function () {
      const { greeter, erc20Token } = await this.loadFixture(unitFixtureGreeter);
      this.contracts.greeter = greeter;
      this.mocks.erc20Token = erc20Token;
    });

    it("should return the new greeting once it's changed", async function () {
      expect(await this.contracts.greeter.connect(this.signers.alice).greet()).to.equal(GREETING);

      await this.contracts.greeter.setGreeting("Bonjour, le monde!");
      expect(await this.contracts.greeter.connect(this.signers.alice).greet()).to.equal("Bonjour, le monde!");
    });

    it("should revert with GreeterError() on throwError()", async function () {
      await expect(this.contracts.greeter.connect(this.signers.alice).throwError()).to.be.revertedWith("GreeterError");
    });

    it("should allow user to sendGreeting()", async function () {
      const tokenDecimals = await this.mocks.erc20Token.decimals();
      const amount = parseUnits("5", tokenDecimals);

      await this.mocks.erc20Token.mock.transferFrom
        .withArgs(this.signers.alice.address, this.contracts.greeter.address, amount)
        .returns(true);

      await expect(
        this.contracts.greeter.connect(this.signers.alice).sendGreeting(this.mocks.erc20Token.address, amount),
      )
        .to.emit(this.contracts.greeter, "GreetingsSent")
        .withArgs(this.signers.alice.address, this.mocks.erc20Token.address, amount);

      // Waffle's calledOnContractWith is not currently supported by Hardhat
      // https://github.com/NomicFoundation/hardhat/issues/1135
      // expect("transferFrom").to.be.calledOnContractWith(this.mocks.erc20, [
      //   this.signers.alice.address,
      //   this.contracts.greeter.address,
      //   amount,
      // ]);

      expect(
        await this.contracts.greeter
          .connect(this.signers.alice)
          .greetings(this.signers.alice.address, this.mocks.erc20Token.address),
      ).to.equal(amount);
    });

    it("should revert with InsufficientGreetings() on withdrawGreeting() if sender has not sent enough greetings", async function () {
      const tokenDecimals = await this.mocks.erc20Token.decimals();
      const amount = parseUnits("5", tokenDecimals);

      expect(
        await this.contracts.greeter
          .connect(this.signers.alice)
          .greetings(this.signers.alice.address, this.mocks.erc20Token.address),
      ).to.equal(0);

      await expect(
        this.contracts.greeter.connect(this.signers.alice).withdrawGreeting(this.mocks.erc20Token.address, amount),
      ).to.be.revertedWith("InsufficientGreetings");
    });

    it("should allow user to withdrawGreeting()", async function () {
      const tokenDecimals = await this.mocks.erc20Token.decimals();
      const sendAmount = parseUnits("5", tokenDecimals);
      const withdrawAmount = parseUnits("2", tokenDecimals);

      await this.mocks.erc20Token.mock.transferFrom
        .withArgs(this.signers.alice.address, this.contracts.greeter.address, sendAmount)
        .returns(true);
      await this.contracts.greeter.connect(this.signers.alice).sendGreeting(this.mocks.erc20Token.address, sendAmount);

      await this.mocks.erc20Token.mock.transfer.withArgs(this.signers.alice.address, withdrawAmount).returns(true);

      await expect(
        this.contracts.greeter
          .connect(this.signers.alice)
          .withdrawGreeting(this.mocks.erc20Token.address, withdrawAmount),
      )
        .to.emit(this.contracts.greeter, "GreetingsWithdrawn")
        .withArgs(this.signers.alice.address, this.mocks.erc20Token.address, withdrawAmount);

      // Waffle's calledOnContractWith is not currently supported by Hardhat
      // https://github.com/NomicFoundation/hardhat/issues/1135
      // expect("transfer").to.be.calledOnContractWith(this.mocks.erc20, [
      //   this.signers.alice.address,
      //   withdrawAmount,
      // ]);

      expect(
        await this.contracts.greeter
          .connect(this.signers.alice)
          .greetings(this.signers.alice.address, this.mocks.erc20Token.address),
      ).to.equal(sendAmount.sub(withdrawAmount));
    });
  });
}
