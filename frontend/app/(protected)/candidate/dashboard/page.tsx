"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getCandidateDashboard } from "@/services/candidate.service";
import MatchedJobCard from "@/components/ui/MachedJobCard";
import {  uploadResume} from "@/services/resume.service";
import toast from "react-hot-toast";

const CandidateDashboard = () => {
  const { user, token } = useAuth(); // Assuming token is stored in context
  const [jobs, setJobs] = useState<MatchedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleUpload = async () => {
      if (!selectedFile)
         return toast.error("Select a file");
    try {
      const resume = await uploadResume(selectedFile);
      console.log(resume)
      toast.success("Resume uploaded");
    } catch (err) {
      toast.error("Failed to upload resume");
    }
  };

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      try {
        const data = await getCandidateDashboard(token);
     
      setJobs(data.matchedJobs || []);
      } catch (err) {
        toast.error("Failed to load your matches");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);
return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
           <div className="mb-6">       <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />        <button
          onClick={handleUpload}
          className="ml-2 bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Upload Resume
        </button>
      </div>
        
      
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border">
              <p className="text-gray-500">No matches found. Try uploading a more detailed resume!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <MatchedJobCard key={job.jobId} job={job} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CandidateDashboard;


