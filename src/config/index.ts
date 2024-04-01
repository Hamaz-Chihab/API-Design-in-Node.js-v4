import * as dotenv from "dotenv";
import merge from "lodash.merge";

// Load environment variables securely from a `.env` file (optional)
dotenv.config({ path: ".env" });

// Validate required environment variables for production
const validateEnvVars = () => {
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.JWT_SECRET || !process.env.DATABASE_URL)
  ) {
    throw new Error(
      "Missing required environment variables: JWT_SECRET and DATABASE_URL"
    );
  }
};

const stage = process.env.STAGE || "local";
let envConfig;

try {
  validateEnvVars(); // Perform validation before loading configuration

  if (stage === "production") {
    envConfig = require("./prod").default;
  } else if (stage === "testing") {
    // Add a testing configuration file if needed
    envConfig = require("./testing").default;
  } else {
    envConfig = require("./local").default;
  }
} catch (error) {
  console.error("Error loading configuration:", error);
  process.exit(1); // Exit with error code
}

export default merge({
  stage,
  env: process.env.NODE_ENV,
  port: envConfig.port, // Use port from the loaded configuration
  secrets: {
    jwt: process.env.JWT_SECRET || "", // Set a default empty string for JWT secret if not provided
    dbUrl: process.env.DATABASE_URL,
  },
  // Add other shared configurations with defaults or logic
});
