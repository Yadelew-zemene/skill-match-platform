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
        // Assuming your API returns { matched_jobs: [...] }
        setJobs(data.matched_jobs || []);
      } catch (err) {
        toast.error("Failed to load your matches");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Logic for uploading resume would go here
    toast.success("Resume uploaded! Refreshing matches...");
    // Re-fetch jobs after successful upload
  };

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
        
        {/* <label className="cursor-pointer bg-white border-2 border-dashed border-blue-400 p-4 rounded-lg hover:bg-blue-50 transition-colors">
          <span className="text-blue-600 font-medium">+ Upload New Resume</span>
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label> */}
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
                <MatchedJobCard key={job.job_id} job={job} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CandidateDashboard;



// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import {  uploadResume} from "@/services/resume.service";
// import toast from "react-hot-toast";

// interface Resume {
//   id: number;
//   file_path: string;
//   extracted_text: string;
//   created_at: string;
// }

// interface Match {
//   job_id: number;
//   title: string;
//   score: number;
//   matched_skills: string[];
// }

// const CandidateDashboard = () => {
//   const { user } = useAuth();
//   const [resumes, setResumes] = useState<Resume[]>([]);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [matches, setMatches] = useState<Record<number, Match[]>>({});


//   const handleUpload = async () => {
//     if (!selectedFile) return toast.error("Select a file");
//     try {
//       const resume = await uploadResume(selectedFile);
//       setResumes((prev) => [resume, ...prev]);
//       toast.success("Resume uploaded");
//     } catch (err) {
//       toast.error("Failed to upload resume");
//     }
//   };

//   const loadMatchedjobs = async (resumeId: number) => {
//     try {
//       const data = await fetchResumeMatches(resumeId);
//       setMatches((prev) => ({ ...prev, [resumeId]: data }));
//     } catch {
//       toast.error("Failed to load matches");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Candidate Dashboard</h1>

//       <div className="mb-6">
//         <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
//         <button
//           onClick={handleUpload}
//           className="ml-2 bg-green-600 text-white p-2 rounded hover:bg-green-700"
//         >
//           Upload Resume
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {resumes.map((resume) => (
//           <div key={resume.id} className="p-4 bg-white rounded shadow">
//             <h2 className="font-semibold">Resume {resume.id}</h2>
//             <p className="text-gray-500 text-sm">{resume.extracted_text?.substring(0, 100)}...</p>
//             <button
//               onClick={() => loadMatches(resume.id)}
//               className="mt-2 text-blue-500 hover:underline text-sm"
//             >
//               View Matches
//             </button>

//             {matches[resume.id] && (
//               <ul className="mt-2">
//                 {matches[resume.id].map((m) => (
//                   <li key={m.job_id} className="text-sm">
//                     {m.title} - Score: {m.score}%
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

//  export default CandidateDashboard;
