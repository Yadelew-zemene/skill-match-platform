"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchResumes, uploadResume, fetchResumeMatches } from "@/services/resume.service";
import toast from "react-hot-toast";

interface Resume {
  id: number;
  file_path: string;
  extracted_text: string;
  created_at: string;
}

interface Match {
  job_id: number;
  title: string;
  score: number;
  matched_skills: string[];
}

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [matches, setMatches] = useState<Record<number, Match[]>>({});

  // Fetch resumes
  useEffect(() => {
    fetchResumes()
      .then(setResumes)
      .catch(() => toast.error("Failed to fetch resumes"));
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return toast.error("Select a file");
    try {
      const resume = await uploadResume(selectedFile);
      setResumes((prev) => [resume, ...prev]);
      toast.success("Resume uploaded");
    } catch (err) {
      toast.error("Failed to upload resume");
    }
  };

  const loadMatches = async (resumeId: number) => {
    try {
      const data = await fetchResumeMatches(resumeId);
      setMatches((prev) => ({ ...prev, [resumeId]: data }));
    } catch {
      toast.error("Failed to load matches");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Candidate Dashboard</h1>

      <div className="mb-6">
        <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
        <button
          onClick={handleUpload}
          className="ml-2 bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Upload Resume
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumes.map((resume) => (
          <div key={resume.id} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold">Resume {resume.id}</h2>
            <p className="text-gray-500 text-sm">{resume.extracted_text?.substring(0, 100)}...</p>
            <button
              onClick={() => loadMatches(resume.id)}
              className="mt-2 text-blue-500 hover:underline text-sm"
            >
              View Matches
            </button>

            {matches[resume.id] && (
              <ul className="mt-2">
                {matches[resume.id].map((m) => (
                  <li key={m.job_id} className="text-sm">
                    {m.title} - Score: {m.score}%
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateDashboard;