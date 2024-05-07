import "dotenv/config"; // Load environment variables from a .env file into process.env

import { db, postgresClient } from "./db"; // Import the database connection from the db.ts file
import { seedCodeSnippets } from "./seeds/codeSnippets.seed";
import { seedConstraints } from "./seeds/constraints.seed";
import { seedExamples } from "./seeds/examples.seed";
import { seedQuestions } from "./seeds/questions.seed";
import { seedTestCases } from "./seeds/testCases.seed";
import { seedTopics } from "./seeds/topics.seed";
import { seedUsers } from "./seeds/users.seed";

// Main function to seed the database
async function main() {
  try {
    console.log("Starting database seeding...");

    // Seed the database with the data
    await seedUsers();
    await seedQuestions();
    await seedTopics();
    await seedExamples();
    await seedTestCases();
    await seedConstraints();
    await seedCodeSnippets();

    console.log("Database seeding finished successfully!");
  } catch (error) {
    console.error("Seeding failed. Error:", error);
  } finally {
    console.log("Closing database connection...");
    // await db.end();
    await postgresClient.end(); // Use the client to close/end the database connection
    console.log("Database connection closed.");
  }
}

main();
