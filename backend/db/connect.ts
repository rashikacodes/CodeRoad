import mongoose from "mongoose";
import { env } from "../config/env";

export async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect(env.mongoUri);
    console.log(`MongoDB connected to: ${conn.connection.db?.databaseName}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}