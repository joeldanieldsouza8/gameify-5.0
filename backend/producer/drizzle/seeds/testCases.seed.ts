import { db } from "../db";
import testCasesData from "./data/testCases.json";
import {
  testCaseTable,
  NewTestCaseTableType,
  TestCaseTableType,
} from "../schema/models/testCase.model";

export async function seedTestCases() {
  const testCases = testCasesData as NewTestCaseTableType[];

  for (const testCase of testCases) {
    await db.insert(testCaseTable).values(testCase).returning();
  }
}
