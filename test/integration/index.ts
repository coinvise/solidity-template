import { baseContext } from "../shared/contexts";
import { integrationTestGreeter } from "./greeter/Greeter.test";

baseContext("Integration Tests", function () {
  integrationTestGreeter();
});
