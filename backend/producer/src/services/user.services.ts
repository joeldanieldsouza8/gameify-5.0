// This file contains the service functions for interacting with the user table in the database.
// This is where the business logic for handling user data is implemented.

import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { user } from "../../drizzle/schema/models/user";
import { UserType, NewUserType } from "../../drizzle/schema/models/user";

import redisClient from "../config/redisClient";
import {
  addToRedisSortedSet,
  addToRedisStream,
  getFromRedisSortedSet,
  getFromRedisStream,
  getFromRedisStreamById,
} from "../utils/redisUtils";

import {
  REDIS_USER_SORTED_SET_KEY,
  REDIS_USER_STREAM_KEY,
} from "../lib/constants";

async function getUsers() {
  console.log("user.service.ts getUsers() called"); // debug
  try {
    let cachedUsers = await redisClient.zrange(
      REDIS_USER_SORTED_SET_KEY,
      0,
      -1,
      "WITHSCORES"
    );

    if (cachedUsers.length) {
      // console.log("CACHE HIT: Fetched users from Redis cache:", cachedUsers); // debug
      console.log(
        `CACHE HIT: ${cachedUsers.length} users fetched from Redis.`,
        cachedUsers
      ); // debug

      return cachedUsers.map((user) => JSON.parse(user));
    }

    console.log("CACHE MISS: Fetching all users from database"); // debug

    const fetchedUsers: UserType[] = await db.query.user.findMany();

    // console.log("Fetched users:", fetchedUsers); // debug
    console.log(
      `Database Fetch: Retrieved ${fetchedUsers.length} users.`,
      fetchedUsers
    ); // debug

    fetchedUsers.forEach(async (user) => {
      console.log(
        `Caching user ${user.clerkID} with score ${user.xpPoints}`,
        user
      ); // debug

      await addToRedisSortedSet(
        REDIS_USER_SORTED_SET_KEY,
        user.clerkID,
        user.xpPoints
      );

      await addToRedisStream(REDIS_USER_STREAM_KEY, user);
    });

    return fetchedUsers;
  } catch (error) {
    // console.error("Error fetching users from database:", error); // debug
    console.error("Failed to fetch users:", error); // debug

    throw new Error("Unable to get users from database");
  }
}

async function getUserById(userID: string) {
  try {
    console.log(`Fetching user with ID: ${userID}`); // debug

    // Fetch the user from the database
    const fetchedUser = await db.query.user.findFirst({
      where: eq(user.clerkID, userID),
    });
    console.log("Fetched user:", fetchedUser); // debug

    return fetchedUser;
  } catch (error) {
    console.error("Error fetching user from database:", error);

    return {
      success: false,
      data: null,
      message: "Unable to get user from database",
    };
  }
}

// Clerk Webhook Handler
async function deleteUser(userID: string) {
  try {
    console.log(`Attempting to delete user with ID: ${userID}`); // debug

    // Delete the user from the database
    const deletedUser = await db
      .delete(user)
      .where(eq(user.clerkID, userID))
      .execute();

    console.log("User deleted successfully:", deletedUser); // debug

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user from database:", error);

    return {
      success: false,
      data: null,
      message: "Database operation failed.",
    };
  }
}

// type NewUserType = {
//   clerkID: string;
//   username: string | null;
//   email: string;
//   firstName: string | null;
//   lastName: string | null;
// };

// Clerk Webhook Handler
async function createUser(userData: NewUserType) {
  console.log("createUser() called with data:", userData); // debug

  try {
    // console.log("Attempting to create or update user:", userData); // debug
    console.log(
      `Attempting to create or update user with clerkID: ${userData.clerkID}`,
      userData
    ); // debug

    // The onConflictDoUpdate() method will check if a row with the same clerkID already exists in the user table.
    // If a conflict is detected, it will update the existing row with the new values instead of inserting a new row.
    // This way, you can avoid creating duplicate users in your database when the user.created or user.updated events are received from Clerk.
    const result: NewUserType[] = await db
      .insert(user)
      .values(userData)
      .onConflictDoUpdate({
        target: user.clerkID, // The target option specifies the column(s) that should be used to detect conflicts. In this case, we're using the clerkID column.
        set: {
          // The set option specifies the columns that should be updated if a conflict is detected. In this case, we're updating the username, email, firstName, and lastName columns.
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
      })
      .returning()
      .execute();

    console.log("Database operation successful. Result:", result); // debug

    /*
    // Assuming the operation returns an array and we need the first element.
    const createdUser = result[0];

    // Add the user to the Redis sorted set and stream if it was created or updated successfully
    if (createdUser) {
      // Safely handle potentially undefined xpPoints with a default value of 0
      const xpPoints = createdUser.xpPoints || 0;

      await addToRedisSortedSet(
        REDIS_USER_SORTED_SET_KEY,
        createdUser.clerkID,
        xpPoints
      );

      await addToRedisStream(REDIS_USER_STREAM_KEY, createdUser);
      console.log("User created/updated successfully:", createdUser);

      return createdUser;
    }

    throw new Error("No user was created or updated.");
    */

    // Check if the result array is not empty and contains the created/updated user data (assuming the operation was successful)
    if (result && result.length) {
      const createdUser = result[0]; // Assuming the operation returns an array and we need the first element.
      console.log("User created/updated in database:", createdUser); // debug

      // Safely handle potentially undefined xpPoints with a default value of 0
      const xpPoints = createdUser.xpPoints || 0;

      // Add the user to the Redis sorted set and stream
      await addToRedisSortedSet(
        REDIS_USER_SORTED_SET_KEY,
        createdUser.clerkID,
        xpPoints
      );
      console.log(
        `User ${createdUser.clerkID} added to Redis Sorted Set with score ${xpPoints}`
      ); // debug

      await addToRedisStream(REDIS_USER_STREAM_KEY, createdUser);
      console.log(`User ${createdUser.clerkID} added to Redis Stream`); // debug

      return createdUser;
    } else {
      throw new Error(
        "No user was created or updated - result array was empty."
      );
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);

    return {
      success: false,
      data: null,
      message: "Database operation failed.",
    };
  }
}

export const userService = {
  getUsers,
  getUserById,
  deleteUser,
  createUser,
};
