// This file contains the controller functions for handling user data.
// This is where the request and response logic for user data is implemented.

import { Request, Response } from "express";

import { userService } from "../services/user.services";

import {
  UserTableType,
  NewUserTableType,
} from "../../drizzle/schema/models/user.model";

async function getUsers(req: Request, res: Response) {
  try {
    console.log("Fetching all users"); // debug

    // Fetch all users from the database
    const fetchedUsers = await userService.getUsers();
    console.log("Fetched users:", fetchedUsers); // debug

    return res.status(200).json({ success: true, data: fetchedUsers });
  } catch (error) {
    console.error("Error fetching users from database:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to get users from database",
    });
  }
}

async function getUserById(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    console.log(`Fetching user with ID: ${userId}`); // debug

    // Fetch the user from the database
    const fetchedUser = await userService.getUserById(userId);
    console.log("Fetched user:", fetchedUser); // debug

    return res.status(200).json({ success: true, data: fetchedUser });
  } catch (error) {
    console.error("Error fetching user from database:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to get user from database",
    });
  }
}

// type NewUserType = {
//   clerkID: string;
//   username: string | null;
//   email: string;
//   firstName: string | null;
//   lastName: string | null;
// };

async function createUser(req: Request, res: Response) {
  const data: NewUserTableType = req.body;

  try {
    console.log("Creating new user"); // debug

    // Create a new user in the database
    const newUser = await userService.createUser(data);
    console.log("New user created:", newUser); // debug

    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error creating new user:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to create new user",
    });
  }
}

async function deleteUser(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    console.log(`Attempting to delete user with ID: ${userId}`); // debug

    // Delete the user from the database
    const deletedUser = await userService.deleteUser(userId);

    console.log(`User with ID: ${userId} deleted successfully.`, deletedUser); // debug
    return res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    console.error("Error deleting user from database:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Database operation failed.",
    });
  }
}

export const userController = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
};
