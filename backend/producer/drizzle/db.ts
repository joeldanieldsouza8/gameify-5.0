// import * as schema from "./schema/";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Import all models and enums
import { difficultyEnum, topicTagEnum, badgeEnum } from "./schema/enums/enums";
import { adminTable } from "./schema/models/admin.model";
import { answeredQuestionsTable } from "./schema/models/answeredQuestions.model";
import { exampleTable } from "./schema/models/example.model";
import { postTable } from "./schema/models/post.model";
import { postCommentTable } from "./schema/models/postComment.model";
import { questionTable } from "./schema/models/question.model";
import { questionPostTable } from "./schema/models/questionPost.model";
import { questionPostCommentTable } from "./schema/models/questionPostComment.model";
import { testCaseTable } from "./schema/models/testCase.model";
import { userTable } from "./schema/models/user.model";
import { userPreferenceTable } from "./schema/models/userPreference.model";
import { topicTable } from "./schema/models/topic.model";
import { constraintsTable } from "./schema/models/constraints.model";
import { codeSnippetTable } from "./schema/models/codeSnippet.model";

if (!process.env.DB_HOST || !process.env.DB_PASSWORD || !process.env.DB_URL) {
  console.error("Missing DB_HOST:", process.env.DB_HOST);
  console.error("Missing DB_USER:", process.env.DB_USER);
  console.error("Missing DB_PASSWORD:", process.env.DB_PASSWORD);
  console.error("Missing DB_NAME:", process.env.DB_NAME);
  console.error("Missing DB_URL:", process.env.DB_URL);

  throw new Error("Missing environment variables for database connection");
}

// Create a new Postgres client with the connection string from the environment variables
const queryClient = postgres(process.env.DB_URL as string);

// This allows explicit connection management when needed
export const postgresClient = queryClient;

// export const db = drizzle(queryClient, { schema, logger: true }); // Create a new Drizzle instance with the schema from the schema file  and the query client
export const db = drizzle(queryClient, {
  schema: {
    difficultyEnum,
    topicTagEnum,
    badgeEnum,
    adminTable,
    answeredQuestionsTable,
    exampleTable,
    postTable,
    postCommentTable,
    questionTable,
    questionPostTable,
    questionPostCommentTable,
    testCaseTable,
    userTable,
    userPreferenceTable,
    topicTable,
    constraintsTable,
    codeSnippetTable,
  },
  logger: true,
});
