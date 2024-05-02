import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis({
  port: 16592, // Redis port
  host: process.env.REDIS_URL, // Redis host
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export default redisClient;