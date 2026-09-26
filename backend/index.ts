import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { connectDB } from "./db/connect";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors({ origin: env.webUrl, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);

async function start() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`CodeRoad API running on http://localhost:${env.port}`);
  });
}

start();