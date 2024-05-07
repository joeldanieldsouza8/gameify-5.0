"use server";

export async function fetchAllUsers() {
  try {
    const response = await fetch("http://localhost:4000/users");

    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }

    const data = await response.json();

    const users = data.data;
    console.log("Fetched ALL USERS", users); // debug

    return users;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}

export async function fetchUserById(userId: string) {
  try {
    const response = await fetch(`http://localhost:4000/users/${userId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }

    const data = await response.json();

    const user = data.data;
    console.log("Fetched USER by ID", user); // debug

    return user;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
