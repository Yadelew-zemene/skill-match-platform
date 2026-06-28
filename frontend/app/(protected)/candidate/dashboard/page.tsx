"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MatchedJobCard from "@/components/ui/MachedJobCard";
import { uploadResume } from "@/services/resume.service";
import toast from "react-hot-toast";
import { useCandidateJobs } from "@/hooks/usecandidateJobs";

const CandidateDashboard = () => {
  const { user } = useAuth();
  const { jobs, loading, refresh } = useCandidateJobs();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return toast.error("Select a file");

    try {
      setUploading(true);

      await uploadResume(selectedFile);

      toast.success("Resume uploaded successfully");

      refresh();
    } catch {
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      {/* HEADER SECTION */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Candidate Dashboard
        </h1>

        <p className="text-gray-600 mt-1">
          Welcome back, <span className="font-medium">{user?.name}</span>
        </p>
      </div>

      {/* UPLOAD SECTION CARD */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">

        <h2 className="text-lg font-semibold mb-4">
          Upload Your Resume
        </h2>

        <div className="flex flex-col md:flex-row gap-4 md:items-center">

          <input
            type="file"
            onChange={(e) =>
              setSelectedFile(e.target.files?.[0] || null)
            }
            className="block w-full text-sm border rounded-lg p-2 bg-gray-50"
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>

        </div>

        <p className="text-xs text-gray-500 mt-3">
          Upload your resume to get AI-powered job matches
        </p>
      </div>

      {/* RESULTS SECTION */}
      <div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Recommended Jobs
          </h2>

          <span className="text-sm text-gray-500">
            {jobs.length} matches
          </span>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border rounded-xl p-10 text-center">
            <p className="text-gray-500">
              No matches found. Upload a better resume to improve results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <MatchedJobCard key={job.jobId} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;