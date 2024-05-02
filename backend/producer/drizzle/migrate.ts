import "dotenv/config"; // Import the dotenv package to load environment variables from the .env file
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

/* 
  Note: 
    - For the built in migrate function with DDL migrations we strongly encourage you to use max: 1 connection configuration.
    - For querying purposes feel free to use pool size of your choice based on your business demands.
*/

async function main() {
  console.log("Starting the migration process...");

  // For migrations, use a single connection as recommended
  const migrationClient = postgres(process.env.DB_URL as string, { max: 1 });

  try {
    console.log("Connecting to the database...");
    // Initialize the drizzle client with the migration connection
    const drizzleClient = drizzle(migrationClient);
    console.log("Database connection established.");

    console.log("Running migrations...");
    await migrate(drizzleClient, {
      migrationsFolder: "./drizzle/migrations", // Path to the migrations folder
    });

    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    console.log("Closing the database connection...");
    await migrationClient.end(); // Close the connection
    console.log("Database connection closed.");
  }
}

main();
