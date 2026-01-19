import Resume from "../models/Resume.js";
// controller for creating new resume
// PORT: /api/resumes/create

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({ userId, title });

    // return success message
    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// controller for deleting user resumes
// DELETE: /api/resumes/delete

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    // delete resume
    await Resume.findOneAndDelete({ userId, _id: resumeId });

    // return success message
    return res.status(201).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// get user resumes by id
// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(400).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    // return success message
    return res.status(201).json({ resume });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// get user resumes by public
// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(400).json({ message: "Resume not found" });
    }

    // return success message
    return res.status(201).json({ resume });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// controller for updating resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file ? req.file.path : null;

    let resumeDataCopy = JSON.parse(JSON.stringify(resumeData));

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      {
        new: true,
      },
    );

    // return success message
    return res
      .status(201)
      .json({ message: "Resume updated successfully", resume });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
