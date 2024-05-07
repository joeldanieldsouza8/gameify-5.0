"use server";

import { QuestionType } from "@/types/types";

export async function fetchAllQuestions() {
  try {
    const response = await fetch("http://localhost:4000/questions");

    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }

    const data = await response.json();

    const questions: QuestionType[] = data.data;
    console.log("Fetched ALL QUESTIONS", questions); // debug

    return questions;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}

export async function fetchQuestionsByTopic(topicTag: string) {
  try {
    const response = await fetch(`http://localhost:4000/questions/topics/${topicTag}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }

    const data = await response.json();

    const questions: QuestionType[] = data.data;
    console.log("Fetched QUESTIONS BY TOPIC TAG", questions); // debug

    return questions;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}

export async function fetchQuestionById(questionId: string) {
  try {
    const response = await fetch(
      `http://localhost:4000/questions/${questionId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }

    const data = await response.json();

    const question: QuestionType = data.data;
    console.log("Fetched QUESTION BY ID", question); // debug

    return question;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
