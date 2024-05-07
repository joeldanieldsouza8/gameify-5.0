"use server";

export async function fetchTestCasesByQuestionId(questionId: string) {
  try {
    const response = await fetch(
      `http://localhost:4000/test-cases/${questionId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }

    const data = await response.json();

    const testCases = data.data;
    console.log("Fetched TEST CASES BY QUESTION ID", testCases); // debug

    return testCases;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}