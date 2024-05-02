// import * as schema from "./schema/";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Import all models and enums
import { difficultyEnum, topicTagEnum, badgeEnum } from "./schema/enums/enums";
import { admin } from "./schema/models/admin";
import { answeredQuestions } from "./schema/models/answeredQuestions";
import { example } from "./schema/models/example";
import { post } from "./schema/models/post";
import { postComment } from "./schema/models/postComment";
import { question } from "./schema/models/question";
import { questionPost } from "./schema/models/questionPost";
import { questionPostComment } from "./schema/models/questionPostComment";
import { testCase } from "./schema/models/testCase";
import { user } from "./schema/models/user";
import { userPreference } from "./schema/models/userPreference";

if (
  !process.env.DB_HOST ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_URL
) {
  console.error("Missing DB_HOST:", process.env.DB_HOST);
  console.error("Missing DB_USER:", process.env.DB_USER);
  console.error("Missing DB_PASSWORD:", process.env.DB_PASSWORD);
  console.error("Missing DB_NAME:", process.env.DB_NAME);
  console.error("Missing DB_URL:", process.env.DB_URL);
  
  throw new Error("Missing environment variables for database connection");
}

// Create a new Postgres client with the connection string from the environment variables
const queryClient = postgres(process.env.DB_URL as string);
// export const db = drizzle(queryClient, { schema, logger: true }); // Create a new Drizzle instance with the schema from the schema file  and the query client
export const db = drizzle(queryClient, {
  schema: {
    difficultyEnum,
    topicTagEnum,
    badgeEnum,
    admin,
    answeredQuestions,
    example,
    post,
    postComment,
    question,
    questionPost,
    questionPostComment,
    testCase,
    user,
    userPreference,
  },
  logger: true,
});
