import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";

import {
  topicTable,
  NewTopicTableType,
  TopicTableType,
} from "../../drizzle/schema/models/topic.model";

// GET all topics
async function getTopics() {
  console.log("topic.services.ts getTopics() called"); // debug
  try {
    const fetchedTopics: TopicTableType[] = await db.query.topicTable.findMany();

    // Guard clause
    if (!fetchedTopics) {
      console.error("Topics not found in database");

      // Return null if no topics are found
      return null;
    }

    console.log("Database Fetch: Retrieved topics:", fetchedTopics); // debug
    return fetchedTopics;
  } catch (error) {
    console.error("Error fetching topics from database:", error);
    throw new Error("Error fetching topics from database");
  }
}

export const topicService = {
  getTopics,
};