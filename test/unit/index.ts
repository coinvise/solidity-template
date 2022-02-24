import { baseContext } from "../shared/contexts";
import { unitTestGreeter } from "./greeter/Greeter.test";

baseContext("Unit Tests", function () {
  unitTestGreeter();
});
