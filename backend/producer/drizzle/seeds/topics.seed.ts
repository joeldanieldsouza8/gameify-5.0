import { db } from "../db";
import topicsData from "./data/topics.json";
import {
  topicTable,
  NewTopicTableType,
  TopicTableType,
} from "../schema/models/topic.model";

export async function seedTopics() {
  const topics = topicsData as NewTopicTableType[];

  for (const topic of topics) {
    await db.insert(topicTable).values(topic).returning();
  }
}
