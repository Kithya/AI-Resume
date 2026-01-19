import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";


const app = express();
const PORT = process.env.PORT || 3000;

// database connection
await connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use('/api/users', userRouter)

app.listen(PORT, (req, res) => {
  console.log(`Server running at http://localhost:${PORT}`);
});
