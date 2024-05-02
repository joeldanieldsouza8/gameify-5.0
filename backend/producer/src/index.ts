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

app.use("/users", userRoutes); // Use the user routes from the routes folder in the app instance to handle requests to '/users' endpoint

// type UserData = {
//   clerkUserID: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   badge: string;
//   xpPoints: number;
// };

// entries: {
//   [field: string]: unknown;
// }

// app.post("/getAllUsers", async (req, res) => {
//   const data = req.body;
//   console.log("Data received from frontend:", data); // debug

//   try {
//     // Add the users data to the Redis cache using sorted set
//   } catch (error) {
//     console.error("Error fetching data from Redis:", error);
//     res.status(500).send("Internal server error");
//   }
// });

app.listen(PORT, () => {
  console.log(`Producer service is running on port ${PORT}`);
});
