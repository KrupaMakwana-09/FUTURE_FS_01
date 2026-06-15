import "dotenv/config";
import mongoose from "mongoose";
import { logger } from "./lib/logger.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI =", process.env.MONGODB_URI);
  throw new Error(
    "MONGODB_URI environment variable is required but was not provided."
  );
}

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI as string);

    logger.info("MongoDB connected");
  } catch (err) {
    logger.error({ err }, "MongoDB connection failed");
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    logger.error({ err }, "MongoDB error");
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
  });
}

export { mongoose };