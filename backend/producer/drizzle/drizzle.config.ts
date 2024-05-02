import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Read the .env file if it exists, or a file specified by the
// dotenv_config_path parameter that's passed to Node.js
dotenv.config();
if (!process.env.DB_URL) throw new Error("DB_URL not found in environment");

export default {
  schema: [
    "./drizzle/schema/enums/*.ts",
    "./drizzle/schema/types/*.ts",
    "./drizzle/schema/models/**/*.ts",
  ], // Path to match all TypeScript files in the schema folder
  out: "./drizzle/migrations", // Path to the migrations file
  driver: "pg", // Database driver to use
  dbCredentials: {
    connectionString: process.env.DB_URL as string, // Database connection string
  },
  verbose: true, // Enable verbose mode which tells us what changes are being made to the database schema during migrations
  strict: true, // Enable strict mode which will throw an error if there are any changes to the schema that are not reflected in the schema file
} satisfies Config;
