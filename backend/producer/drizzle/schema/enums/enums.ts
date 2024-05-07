import { z } from 'zod';

import { pgEnum } from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const topicTagEnum = pgEnum("topicTag", [
  "all-topics",
  "other",
  "array",
  "math",
  "string",
  "hash-table",
  "dynamic-programming",
  "sorting",
  "greedy",
  "depth-first-search",
  "database",
  "binary-search",
  "tree",
  "matrix",
  "bit-manipulation",
  "two-pointers",
  "binary-tree",
  "heap-(priority-queue)",
  "prefix-sum",
  "stack",
  "simulation",
  "graph",
  "design",
  "counting",
  "sliding-window",
  "backtracking",
  "union-find",
  "enumeration",
  "linked-list",
  "ordered-set",
  "monotonic-stack",
  "trie",
  "number-theory",
  "divide-and-conquer",
  "recursion",
  "bitmask",
  "queue",
  "binary-search-tree",
  "topological-sort",
  "string-matching",
  "combinatorics",
  "rolling-hash",
  "shortest-path",
  "game-theory",
  "interactive",
  "data-stream",
  "brainteaser",
  "monotonic-queue",
  "randomized",
  "merge-sort",
  "iterator",
  "concurrency",
  "doublly-linked-list",
  "probability-and-statistics",
  "quickselect",
  "bucket-sort",
  "suffix-array",
  "minimum-spanning-tree",
  "counting-sort",
  "shell",
  "line-sweep",
  "reservoir-sampling",
  "stronly-connected-component",
  "eulerian-circuit",
  "radix-sort",
  "rejection-sampling",
  "biconnected-component",
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

// Zod schemas for enums
const difficultyEnumSchema = z.enum(difficultyEnum.enumValues);
const topicTagEnumSchema = z.enum(topicTagEnum.enumValues);
const badgeEnumSchema = z.enum(badgeEnum.enumValues);
const roleEnumSchema = z.enum(roleEnum.enumValues);

// Create a TypeScript type from the Zod schema
export type DifficultyType = z.infer<typeof difficultyEnumSchema>;
export type TopicTagType = z.infer<typeof topicTagEnumSchema>;
export type BadgeType = z.infer<typeof badgeEnumSchema>;
export type RoleType = z.infer<typeof roleEnumSchema>;