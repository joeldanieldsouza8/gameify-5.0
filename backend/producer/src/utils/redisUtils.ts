import redisClient from "../config/redisClient";
import {
  REDIS_USER_SORTED_SET_KEY,
  REDIS_USER_STREAM_KEY,
  REDIS_USER_WITHSCORES,
} from "../lib/constants";

import {
  UserTableType,
  NewUserTableType,
} from "../../drizzle/schema/models/user.model";

// type UserData = {
//   clerkUserID: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   badge: string;
//   xpPoints: number;
// };

export async function addToRedisSortedSet(
  key: string,
  memberId: string,
  score: number
) {
  console.log(
    `Adding to Redis Sorted Set: ${key}, Member: ${memberId}, Score: ${score}`
  ); // debug

  await redisClient.zadd(key, score, memberId);
}

// Ascending order. Note: 0 and -1 means from element index 0 to the last element
export async function getFromRedisSortedSetAscending(key: string) {
  return redisClient.zrange(key, 0, -1, REDIS_USER_WITHSCORES);
}

// Descending order. Note: 0 and -1 means from element index 0 to the last element
export async function getFromRedisSortedSetDescending(key: string) {
  return redisClient.zrevrange(key, 0, -1, REDIS_USER_WITHSCORES);
}

// Get elements from the sorted set by score range
export async function getFromRedisSortedSetByScore(
  key: string,
  min: number,
  max: number
) {
  console.log(
    `Fetching from Redis Sorted Set by score: ${key}, Min: ${min}, Max: ${max}`
  ); // debug

  return redisClient.zrangebyscore(key, min, max, REDIS_USER_WITHSCORES);
}

// Remove an element from Redis Sorted Set
export async function removeFromRedisSortedSet(key: string, member: string) {
  console.log(`Removing from Redis Sorted Set: ${key}, Member: ${member}`); // debug

  await redisClient.zrem(key, member);
}

// Add to Redis Stream
export async function addToRedisStream(key: string, data: any) {
  console.log(`Adding to Redis Stream: ${key}, Data: ${JSON.stringify(data)}`); // debug

  await redisClient.xadd(key, "*", "data", JSON.stringify(data));
}

// Get elements from Redis Stream
export async function getFromRedisStream(key: string) {
  return redisClient.xrange(key, "-", "+");
}

// Get element from Redis Stream by ID
export async function getFromRedisStreamById(key: string, id: string) {
  return redisClient.xrange(key, id, "+");
}
