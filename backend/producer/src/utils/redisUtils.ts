import redisClient from "../config/redisClient";
import {
  REDIS_USER_SORTED_SET_KEY,
  REDIS_USER_STREAM_KEY,
} from "../lib/constants";

import { UserType, NewUserType } from "../../drizzle/schema/models/user";

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
  console.log(`Adding to Redis Sorted Set: ${key}, Member: ${memberId}, Score: ${score}`); // debug

  await redisClient.zadd(key, score.toString(), memberId);
}

export async function addToRedisStream(key: string, data: any) {
  console.log(`Adding to Redis Stream: ${key}, Data: ${JSON.stringify(data)}`); // debug

  await redisClient.xadd(key, "*", "data", JSON.stringify(data));
}

export async function getFromRedisSortedSet(key: string) {
  return redisClient.zrange(key, 0, -1, "WITHSCORES");
}

export async function getFromRedisStream(key: string) {
  return redisClient.xrange(key, "-", "+");
}

export async function getFromRedisStreamById(key: string, id: string) {
  return redisClient.xrange(key, id, "+");
}
