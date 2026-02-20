import { useState, useEffect } from "react";
import axios from "axios"; 
import ResumeCard from "../../components/ResumeCard";

import { useAuth } from "@/hooks/useAuth";
const CandidateDashboard = () => {
  const { user, token } = useAuth();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user]);

  const fetchResumes = async () => {
    try {
      const { data } = await axios.get("/resumes/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(data);
    } catch (err) {
      console.error("Error fetching resumes:", err);
    }
  };

    const [file, setFile] = useState<File | null>(null);

const handleUpload = async () => {
  if (!file) return;
  const formData = new FormData();
  formData.append("resume", file);

  try {
    await axios.post("/resumes/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    fetchResumes(); // refresh after upload
  } catch (err) {
    console.error("Upload failed:", err);
  }
};
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Resumes</h1>
        <div className="mb-4 flex gap-2">
            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="border p-2 rounded"
            />
            <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Upload
            </button>
        </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumes.map((resume: any) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
};

export default CandidateDashboard;