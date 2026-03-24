"use client"
import { MatchedJob } from "@/types/job";



 const MatchedJobCard = ({ job }: { job: MatchedJob }) => {
  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-blue-600">{job.title}</h3>
        <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
          {Math.round(job.score)}% Match
        </span>
      </div>
      <p className="text-sm text-gray-500 font-medium mb-2">{job.company}</p>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{job.description}</p>
      <a 
        href={job.application_link} 
        target="_blank" 
        className="block text-center w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Apply Now
      </a>
    </div>
  );
};
export default MatchedJobCard
