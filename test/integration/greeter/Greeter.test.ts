import { expect } from "chai";
import { parseUnits } from "ethers/lib/utils";
import { integrationFixture } from "../../shared/fixtures";

export function integrationTestGreeter(): void {
  describe("Greeter", function () {
    beforeEach(async function () {
      const { greeter, erc20Token } = await this.loadFixture(integrationFixture);
      this.contracts.greeter = greeter;
      this.contracts.erc20Token = erc20Token;

      await this.contracts.erc20Token.mint(
        this.signers.alice.address,
        parseUnits("100000", await this.contracts.erc20Token.decimals()),
      );
    });

    it("should allow user to sendGreeting()", async function () {
      const tokenDecimals = await this.contracts.erc20Token.decimals();
      const amount = parseUnits("5", tokenDecimals);
      const negativeAmount = parseUnits("-5", tokenDecimals);

      await this.contracts.erc20Token.connect(this.signers.alice).approve(this.contracts.greeter.address, amount);
      await expect(() =>
        this.contracts.greeter.connect(this.signers.alice).sendGreeting(this.contracts.erc20Token.address, amount),
      ).to.changeTokenBalances(
        this.contracts.erc20Token,
        [this.signers.alice, this.contracts.greeter],
        [negativeAmount, amount],
      );

      expect(
        await this.contracts.greeter
          .connect(this.signers.alice)
          .greetings(this.signers.alice.address, this.contracts.erc20Token.address),
      ).to.equal(amount);
    });

    it("should allow user to withdrawGreeting()", async function () {
      const tokenDecimals = await this.contracts.erc20Token.decimals();
      const sendAmount = parseUnits("5", tokenDecimals);
      const withdrawAmount = parseUnits("2", tokenDecimals);
      const negativeWithdrawAmount = parseUnits("-2", tokenDecimals);

      await this.contracts.erc20Token.connect(this.signers.alice).approve(this.contracts.greeter.address, sendAmount);
      await this.contracts.greeter
        .connect(this.signers.alice)
        .sendGreeting(this.contracts.erc20Token.address, sendAmount);

      await expect(() =>
        this.contracts.greeter
          .connect(this.signers.alice)
          .withdrawGreeting(this.contracts.erc20Token.address, withdrawAmount),
      ).to.changeTokenBalances(
        this.contracts.erc20Token,
        [this.contracts.greeter, this.signers.alice],
        [negativeWithdrawAmount, withdrawAmount],
      );

      expect(
        await this.contracts.greeter
          .connect(this.signers.alice)
          .greetings(this.signers.alice.address, this.contracts.erc20Token.address),
      ).to.equal(sendAmount.sub(withdrawAmount));
    });
  });
}
