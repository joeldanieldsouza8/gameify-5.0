import { db } from "../db";
import codeSnippetsData from "./data/codeSnippets.json";
import {
  codeSnippetTable,
  NewCodeSnippetTableType,
  CodeSnippetTableType,
} from "../schema/models/codeSnippet.model";

export async function seedCodeSnippets() {
  const codeSnippets = codeSnippetsData as NewCodeSnippetTableType[];

  for (const codeSnippet of codeSnippets) {
    await db.insert(codeSnippetTable).values(codeSnippet).returning();
  }
}
