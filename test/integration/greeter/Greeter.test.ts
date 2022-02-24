import { expect } from "chai";
import { parseUnits } from "ethers/lib/utils";
import { integrationFixture } from "../../shared/fixtures";

export function integrationTestGreeter(): void {
  describe("Greeter", function () {
    beforeEach(async function () {
      const { greeter, erc20 } = await this.loadFixture(integrationFixture);
      this.contracts.greeter = greeter;
      this.contracts.erc20 = erc20;

      await this.contracts.erc20.mint(
        this.signers.alice.address,
        parseUnits("100000", await this.contracts.erc20.decimals()),
      );
    });

    it("should allow user to sendGreeting()", async function () {
      const tokenDecimals = await this.contracts.erc20.decimals();
      const amount = parseUnits("5", tokenDecimals);
      const negativeAmount = parseUnits("-5", tokenDecimals);

      await this.contracts.erc20.connect(this.signers.alice).approve(this.contracts.greeter.address, amount);
      await expect(() =>
        this.contracts.greeter.connect(this.signers.alice).sendGreeting(this.contracts.erc20.address, amount),
      ).to.changeTokenBalances(
        this.contracts.erc20,
        [this.signers.alice, this.contracts.greeter],
        [negativeAmount, amount],
      );

      expect(
        await this.contracts.greeter
          .connect(this.signers.alice)
          .greetings(this.signers.alice.address, this.contracts.erc20.address),
      ).to.equal(amount);
    });

    it("should allow user to withdrawGreeting()", async function () {
      const tokenDecimals = await this.contracts.erc20.decimals();
      const sendAmount = parseUnits("5", tokenDecimals);
      const withdrawAmount = parseUnits("2", tokenDecimals);
      const negativeWithdrawAmount = parseUnits("-2", tokenDecimals);

      await this.contracts.erc20.connect(this.signers.alice).approve(this.contracts.greeter.address, sendAmount);
      await this.contracts.greeter.connect(this.signers.alice).sendGreeting(this.contracts.erc20.address, sendAmount);

      await expect(() =>
        this.contracts.greeter
          .connect(this.signers.alice)
          .withdrawGreeting(this.contracts.erc20.address, withdrawAmount),
      ).to.changeTokenBalances(
        this.contracts.erc20,
        [this.contracts.greeter, this.signers.alice],
        [negativeWithdrawAmount, withdrawAmount],
      );

      expect(
        await this.contracts.greeter
          .connect(this.signers.alice)
          .greetings(this.signers.alice.address, this.contracts.erc20.address),
      ).to.equal(sendAmount.sub(withdrawAmount));
    });
  });
}
