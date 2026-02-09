import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import resumeRouter from "./routes/resume.route.js";
import aiRouter from "./routes/ai.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// database connection
await connectDB();

app.use(
  cors({
    origin: ["https://ai-resume-wine-five.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server running at http://localhost:${PORT}`);
});
