import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000", // make the domain of frontend is the original path
  credentials: true // allows the cockies
})); // fixing paths in server requests

app.use("/api", authRoutes); // connect auth routes
app.use("/api/tasks", tasksRoutes); // connect tasks routes

app.get("/", (req, res) => {
  res.send("Home");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`this message from server on port: ${PORT}`);
});
