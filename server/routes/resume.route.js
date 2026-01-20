import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controller/resume.controller.js";
import upload from "../config/multer.js";

const resumeRouter = express.Router();

resumeRouter.get("/", (req, res) => {
  res.send("Resume route");
});

resumeRouter.post("/create", protect, createResume);
resumeRouter.put("/update", upload.single("image"), protect, updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;
