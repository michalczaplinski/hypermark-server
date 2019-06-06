import App from "./App";

import dotenv from "dotenv";

dotenv.config();

(async function main() {
  await new App().start();
})();
