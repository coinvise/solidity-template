import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { Greeter } from "../../src/types/Greeter";
import { Greeter__factory } from "../../src/types/factories/Greeter__factory";
import { SUBTASK_DEPLOY_VERIFY, SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, TASK_DEPLOY_GREETER } from "../constants";

task(TASK_DEPLOY_GREETER)
  .addParam("greeting", "Say hello, be nice", "Hello, World", types.string)
  .addParam("confirmations", "How many block confirmations to wait for", 0, types.int)
  .addParam("verify", "Should contract be verified post deployment", true, types.boolean)
  .setAction(async function (taskArguments: TaskArguments, { ethers, run }) {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer: ", deployer.address);

    const greeterFactory: Greeter__factory = <Greeter__factory>await ethers.getContractFactory("Greeter");
    const greeter: Greeter = <Greeter>await greeterFactory.deploy(taskArguments.greeting);

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: greeter,
      confirmations: taskArguments.confirmations,
    });

    console.log("Greeter deployed to: ", greeter.address);
    console.log("Deployment txn hash: ", greeter.deployTransaction.hash);

    if (taskArguments.verify) {
      await run(SUBTASK_DEPLOY_VERIFY, {
        contract: greeter,
        args: [taskArguments.greeting],
      });
    }
  });
