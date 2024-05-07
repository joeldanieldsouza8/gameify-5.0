import dotenv from "dotenv";
dotenv.config();

// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_URL:", process.env.DB_URL);

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./routes/users";
import questionRoutes from "./routes/questions";
import codeSnippetsRoutes from "./routes/codeSnippets";
import examplesRoutes from "./routes/examples";
import testCasesRoutes from "./routes/testCases";
import topicRoutes from "./routes/topics";

// Create an express app instance
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Middleware to parse JSON data
// app.use(express.json()); // Middleware to parse JSON data

const PORT = process.env.PORT || 4000;

app.use("/users", userRoutes);
app.use("/questions", questionRoutes);
app.use("/code-snippets", codeSnippetsRoutes);
app.use("/examples", examplesRoutes);
app.use("/test-cases", testCasesRoutes);
app.use("/topics", topicRoutes);

app.listen(PORT, () => {
  console.log(`Producer service is running on port ${PORT}`);
});
