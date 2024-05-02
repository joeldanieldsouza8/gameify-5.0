import { Router } from "express";

const router = Router();

import { userController } from "../controllers/user.controllers";

router.get("/", userController.getUsers); // GET all users
router.get("/:userId", userController.getUserById); // GET a single user by ID
router.post("/", userController.createUser); // POST a new user
router.delete("/:userId", userController.deleteUser); // DELETE a user by ID

export default router;
