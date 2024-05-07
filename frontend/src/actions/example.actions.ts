"use server";

import { ExampleType } from "@/types/types";

export async function fetchExamplesByQuestionId(questionId: string) {
  try {
    const response = await fetch(
      `http://localhost:4000/examples/${questionId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }

    const data = await response.json();

    const examples: ExampleType[] = data.data;
    console.log("Fetched EXAMPLES BY QUESTION ID", examples); // debug

    return examples;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
