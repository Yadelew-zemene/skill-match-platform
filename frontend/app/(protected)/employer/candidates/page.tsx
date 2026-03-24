"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchCandidateMatches } from "@/services/job.service"; 
import { CANDIDATE_ICONS } from "@/app/constants/candidateIcons";
import toast from "react-hot-toast";


interface CandidateMatch {
  title: string;
  name: string;
  email: string;
  score: number;
  created_at: string;
  file_path: string;
}

export default function CandidatesPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<CandidateMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const loadData = async () => {
      try {
        const data = await fetchCandidateMatches(user.id);
        //setJobs(data); 
        setMatches(data);
      } catch (err) {
        toast.error("Could not load candidates");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  // if (loading) return (
  //   <div className="p-8 text-center animate-pulse text-gray-500 font-medium">
  //     Scanning talent pool...
  //   </div>
  // );

  // Group candidates by job title
  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.title]) acc[match.title] = [];
    acc[match.title].push(match);
    return acc;
  }, {} as Record<string, CandidateMatch[]>);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Candidate Matches</h1>
        <p className="text-gray-500">Talent automatically ranked by skill compatibility.</p>
      </header>

      {Object.keys(groupedMatches).length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border">
          <p className="text-gray-400">No candidates have matched with your jobs yet.</p>
        </div>
      ) : (
        Object.entries(groupedMatches).map(([jobTitle, candidates]) => (
          <div key={jobTitle} className="mb-10">
            {/* Using constant Star Icon */}
            <h2 className="flex items-center gap-2 text-lg font-bold text-blue-700 mb-4 px-2">
              {CANDIDATE_ICONS.Star}
              {jobTitle}
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {candidates.map((candidate, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 w-full md:w-1/3">
                    {/* Using constant User Icon */}
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      {CANDIDATE_ICONS.User}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{candidate.name}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        {/* Using constant Mail Icon */}
                        {CANDIDATE_ICONS.Mail} {candidate.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-start w-full md:w-1/4 my-4 md:my-0">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Match Score</span>
                    <span className={`text-xl font-black ${candidate.score > 80 ? 'text-green-600' : 'text-blue-600'}`}>
                      {Math.round(candidate.score)}%
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 w-full md:w-1/4 text-center md:text-left">
                    <p className="font-medium">Applied on:</p>
                    <p>{new Date(candidate.created_at).toLocaleDateString()}</p>
                  </div>

                  <div className="w-full md:w-auto mt-4 md:mt-0">
                    <a 
                      href={candidate.file_path} 
                      download 
                      target="_blank"
                      className="flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full"
                    >
                     {CANDIDATE_ICONS.Download}
                      Resume
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}