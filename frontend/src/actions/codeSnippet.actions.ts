"use server";

import { CodeSnippetType } from "../types/types";

export async function fetchCodeSnippetsByQuestionId(questionId: string) {
  try {
    const response = await fetch(
      `http://localhost:4000/code-snippets/${questionId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }

    const data = await response.json();

    const codeSnippets: CodeSnippetType[] = data.data;
    console.log("Fetched CODE SNIPPETS BY QUESTION ID", codeSnippets); // debug

    return codeSnippets;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
