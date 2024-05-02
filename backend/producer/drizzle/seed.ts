import "dotenv/config";
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

// Import the schema types
// ...

const seedClient = postgres(process.env.DB_URL as string);
const db = drizzle(seedClient, {
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
  logger: true, // Enable the logger to see the SQL queries in the console for debugging
});

// Helper function to create a new user
async function createUser(userData: any) {
  // Insert the user into the database
  console.log(
    `INSERTING new user: ${userData.firstName} ${userData.lastName}...`
  );
  const newUser = await db
    .insert(user)
    .values({
      clerkID: userData.clerkID,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      badge: userData.badge,
      role: userData.role,
      dailyStreaks: userData.dailyStreaks,
      xpPoints: userData.xpPoints,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    })
    .returning();

  console.log(
    `User ${userData.firstName} ${userData.lastName} CREATED:`,
    newUser
  );
}

// Helper function to create a new question
async function createQuestion(questionData: any) {
  // Insert the question into the database
  console.log(`INSERTING new question: ${questionData.title}...`);
  const newQuestion = await db
    .insert(question)
    .values({
      title: questionData.title,
      body: questionData.body,
      difficulty: questionData.difficulty,
      topicTag: questionData.topicTag,
      xpPoints: questionData.xpPoints,
      upvotes: questionData.upvotes,
      downvotes: questionData.downvotes,
      createdAt: questionData.createdAt,
      updatedAt: questionData.updatedAt,
      authorClerkID: questionData.authorClerkID,
    })
    .returning();

  console.log(`Question ${questionData.title} CREATED:`, newQuestion);
}

const users = [
  {
    clerkID: "1",
    username: "johnsmith123",
    email: "johnsmith@gmail.com",
    firstName: "John",
    lastName: "Smith",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "2",
    username: "susanjohnson123",
    email: "susanjohnsan@gmail.com",
    firstName: "Susan",
    lastName: "Johnson",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "3",
    username: "alicebrown123",
    email: "alicebrown@gmail.com",
    firstName: "Alice",
    lastName: "Brown",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "4",
    username: "bobmartin123",
    email: "bobmartin@gmail.com",
    firstName: "Bob",
    lastName: "Martin",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "5",
    username: "carolwhite123",
    email: "carolwhite@gmail.com",
    firstName: "Carol",
    lastName: "White",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "6",
    username: "davidblack123",
    email: "davidblack@gmail.com",
    firstName: "David",
    lastName: "Black",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "7",
    username: "elenagreen123",
    email: "elenagreen@gmail.com",
    firstName: "Elena",
    lastName: "Green",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "8",
    username: "frankgray123",
    email: "frankgray@gmail.com",
    firstName: "Frank",
    lastName: "Gray",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "9",
    username: "gracehall123",
    email: "gracehall@gmail.com",
    firstName: "Grace",
    lastName: "Hall",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "10",
    username: "henrymoore123",
    email: "henrymoore@gmail.com",
    firstName: "Henry",
    lastName: "Moore",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "11",
    username: "irenewilson123",
    email: "irenewilson@gmail.com",
    firstName: "Irene",
    lastName: "Wilson",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "12",
    username: "jacktaylor123",
    email: "jacktaylor@gmail.com",
    firstName: "Jack",
    lastName: "Taylor",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "13",
    username: "karenjones123",
    email: "karenjones@gmail.com",
    firstName: "Karen",
    lastName: "Jones",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "14",
    username: "larrybrown123",
    email: "larrybrown@gmail.com",
    firstName: "Larry",
    lastName: "Brown",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "15",
    username: "monicalewis123",
    email: "monicalewis@gmail.com",
    firstName: "Monica",
    lastName: "Lewis",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "16",
    username: "nickcarter123",
    email: "nickcarter@gmail.com",
    firstName: "Nick",
    lastName: "Carter",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "17",
    username: "oliviamartin123",
    email: "oliviamartin@gmail.com",
    firstName: "Olivia",
    lastName: "Martin",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "18",
    username: "paulclark123",
    email: "paulclark@gmail.com",
    firstName: "Paul",
    lastName: "Clark",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "19",
    username: "queenieyoung123",
    email: "queenieyoung@gmail.com",
    firstName: "Queenie",
    lastName: "Young",
    xpPoints: Math.floor(Math.random() * 1001),
  },
  {
    clerkID: "20",
    username: "richardking123",
    email: "richardking@gmail.com",
    firstName: "Richard",
    lastName: "King",
    xpPoints: Math.floor(Math.random() * 1001),
  },
];

async function main() {
  try {
    console.log("Starting database seeding...");

    // Insert users
    for (const user of users) {
      await createUser(user);
    }

    // Insert user preference for John Smith
    console.log("Inserting user preference for John Smith...");
    const userPreferenceResult = await db
      .insert(userPreference)
      .values({
        emailNotification: true,
        darkMode: false,
        updatedAt: new Date(),

        // Foreign key constraint
        // userClerkID: userJohnSmith[0].clerkID,
        userClerkID: users[0].clerkID,
      })
      .returning();
    console.log(
      "User preference for John Smith created:",
      userPreferenceResult
    );

    // Insert question 1
    console.log("Inserting question 1...");
    const question1 = await db
      .insert(question)
      .values({
        title: "Median of Two Sorted Arrays",
        body: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\nThe overall run time complexity should be O(log (m+n)).",
        difficulty: "hard",
        topicTag: "arrays",
        xpPoints: 100,
        upvotes: 27_000,
        downvotes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),

        // Foreign key constraint
        // authorClerkID: userJohnSmith[0].clerkID,
        authorClerkID: users[0].clerkID,
      })
      .returning();
    console.log("Question 1 created:", question1);

    // Insert example 1 for question 1
    console.log("Inserting example 1 for question 1...");
    const example1 = await db
      .insert(example)
      .values({
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
        questionID: question1[0].id,
      })
      .returning();
    console.log("Example 1 created:", example1);

    // Insert example 2 for question 1
    console.log("Inserting example 2 for question 1...");
    const example2 = await db
      .insert(example)
      .values({
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation:
          "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
        questionID: question1[0].id,
      })
      .returning();
    console.log("Example 2 created:", example2);

    // Insert test case 1 for question 1
    console.log("Inserting test case 1 for question 1...");
    const testCase1 = await db
      .insert(testCase)
      .values({
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        expectedOutput: "2.00000",
        questionID: question1[0].id,
      })
      .returning();
    console.log("Test case 1 created:", testCase1);

    // Insert test case 2 for question 1
    console.log("Inserting test case 2 for question 1...");
    const testCase2 = await db
      .insert(testCase)
      .values({
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        expectedOutput: "2.50000",
        questionID: question1[0].id,
      })
      .returning();
    console.log("Test case 2 created:", testCase2);

    // Insert question post 1
    console.log("Inserting question post 1...");
    const questionPost1 = await db
      .insert(questionPost)
      .values({
        body: "I got this exact question in an interview last week. I almost gave up because I knew I'm unable to come up with the optimal O(log(n+m)) solution. I quickly did a naive median(sorted(nums1 + nums2)) function and briefly mentioned the optimal approach. The interviewers laughed and said they don't even expect people can implement this within 45 min. Today I received a call telling me I've passed the interview. What a relief!",
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date(),

        // Foreign key constraint
        questionID: question1[0].id,
        // authorClerkID: userJohnSmith[0].clerkID,
        authorClerkID: users[0].clerkID,
      })
      .returning();
    console.log("Question post 1 created:", questionPost1);

    // Insert question post comment 1 for question post 1
    console.log("Inserting question post comment 1 for question post 1...");
    const questionPostComment1 = await db
      .insert(questionPostComment)
      .values({
        body: "Congratulations! That's awesome!",
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date(),

        // Foreign key constraint
        questionPostID: questionPost1[0].id,
        // authorClerkID: userJohnSmith[0].clerkID,
        authorClerkID: users[0].clerkID,
      })
      .returning();
    console.log("Question post comment 1 created:", questionPostComment1);

    // Insert post 1
    console.log("Inserting post 1...");
    const post1 = await db
      .insert(post)
      .values({
        title: "How to prepare for technical interviews?",
        body: "I'm a software engineer with 5 years of experience. I'm planning to switch companies and I'm nervous about technical interviews. What are some tips to prepare for technical interviews?",
        upvotes: 0,
        downvotes: 0,
        topicTag: "other",
        createdAt: new Date(),
        updatedAt: new Date(),

        // Foreign key constraint
        // authorClerkID: userJohnSmith[0].clerkID,
        authorClerkID: users[0].clerkID,
      })
      .returning();
    console.log("Post 1 created:", post1);

    // Insert post comment 1 for post 1
    console.log("Inserting post comment 1 for post 1...");
    const postComment1 = await db
      .insert(postComment)
      .values({
        body: "I recommend LeetCode and HackerRank. They have a lot of good practice problems.",
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),

        // Foreign key constraint
        postID: post1[0].id,
        // authorClerkID: userJohnSmith[0].clerkID,
        authorClerkID: users[0].clerkID,
      })
      .returning();
    console.log("Post comment 1 created:", postComment1);

    // Insert answered question 1
    console.log("Inserting answered question 1...");
    const answeredQuestion1 = await db
      .insert(answeredQuestions)
      .values({
        totalQuestionsAnswered: 1,
        // userClerkID: userJohnSmith[0].clerkID,
        userClerkID: users[0].clerkID,
      })
      .returning();
    console.log("Answered question 1 created:", answeredQuestion1);

    console.log("Database seeding finished successfully!");
  } catch (error) {
    console.error("Seeding failed. Error:", error);
  } finally {
    console.log("Closing database connection...");
    await seedClient.end();
    console.log("Database connection closed.");
  }
}

main();
