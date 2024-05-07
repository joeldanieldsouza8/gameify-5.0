import { Request, Response } from "express";

import { topicService } from "../services/topic.services";

import {
  TopicTableType,
  NewTopicTableType,
} from "../../drizzle/schema/models/topic.model";

// GET all topics
async function getTopics(req: Request, res: Response) {
  try {
    console.log("Fetching all topics"); // debug

    // Fetch all topics from the database
    const fetchedTopics = await topicService.getTopics();

    // Guard clause
    if (!fetchedTopics) {
      console.error("Topics not found in database");

      return res.status(404).json({
        success: false,
        data: null,
        message: "Topics not found in database",
      });
    }

    console.log("Fetched topics:", fetchedTopics); // debug

    return res.status(200).json({ success: true, data: fetchedTopics });
  } catch (error) {
    console.error("Error fetching topics from database:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to get topics from database",
    });
  }
}

export const topicController = {
  getTopics,
};
