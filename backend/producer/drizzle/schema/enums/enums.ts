import { pgEnum } from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const topicTagEnum = pgEnum("topicTag", [
  "linked_lists",
  "arrays",
  "binary_search",
  "divide_and_conquer",
  "stacks",
  "queues",
  "trees",
  "hash_tables",
  "graphs",
  "recursion",
  "recursive_binary_search_trees",
  "sorting",
  "tree_traversal",
  "dynamic_programming",
  "other",
]);

export const badgeEnum = pgEnum("badge", [
  "unranked",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "elite",
  "champion",
  "unreal",
]);

export const roleEnum = pgEnum("role", ["admin", "user"]);
