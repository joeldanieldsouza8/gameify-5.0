import { db } from "../db";
import constraintsData from "./data/constraints.json";
import {
  constraintsTable,
  NewConstraintsTableType,
  ConstraintsTableType,
} from "../schema/models/constraints.model";

export async function seedConstraints() {
  const constraints = constraintsData as NewConstraintsTableType[];

  for (const constraint of constraints) {
    await db.insert(constraintsTable).values(constraint).returning();
  }
}
