import { db } from "../db";
import usersData from "./data/users.json";
import {
  userTable,
  NewUserTableType,
  UserTableType,
} from "../schema/models/user.model";

export async function seedUsers() {
  const users = usersData as NewUserTableType[];

  for (const user of users) {
    await db.insert(userTable).values(user).returning();
  }
}
