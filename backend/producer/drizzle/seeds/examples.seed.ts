import { db } from "../db";
import examplesData from "./data/examples.json";
import {
  exampleTable,
  NewExampleTableType,
  ExampleTableType,
} from "../schema/models/example.model";

export async function seedExamples() {
  const examples = examplesData as NewExampleTableType[];

  for (const example of examples) {
    await db.insert(exampleTable).values(example).returning();
  }
}
