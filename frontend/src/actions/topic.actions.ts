"use server";

export async function fetchAllTopics() {
  try {
    const response = await fetch("http://localhost:4000/topics");

    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }

    const data = await response.json();

    const topics = data.data;
    console.log("Fetched ALL TOPICS", topics); // debug

    return topics;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}

