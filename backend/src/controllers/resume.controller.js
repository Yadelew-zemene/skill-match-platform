import Resume from "../models/resume.model.js";
export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });

        }
        const filePath = req.file.path;
        const userId = req.body.user.id;;
        await Resume.create({ userId, filePath });
        res.status(201).json({
            message: "file Uploaded succcesfully",
            filePath,
        });

    }
    catch (error) {
        res.status(500).json({ message: "Resume uploading faild" });
    }

};
