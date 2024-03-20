//to use the env-var setup in config file
import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";
import config from "./config";
console.log(process.env);
app.listen(config.port, () => {
  console.log(`hello on http://localhost:${config.port}`);
  console.log("the server is opened NOW");
});
