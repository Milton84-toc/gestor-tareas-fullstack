import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import "./models/Task.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*", credentials: true }));
app.use(express.json());

app.get("/", (_, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
  } catch (e) {
    console.error("Error al iniciar:", e.message);
  }
}
start();
