"use client";

import { MatchedJob } from "@/types/candidateDashboard";

const MatchedJobCard = ({ job }: { job: MatchedJob }) => {
  const score = Math.round(job.score);

  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between">

      {/* HEADER */}
      <div>
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-snug">
            {job.title}
          </h3>

          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
            {score}% match
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          {job.company || "Unknown Company"}
        </p>

        {/* MATCH BAR */}
        <div className="mt-3 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="text-xs text-gray-400 mt-1">
          Match strength based on your resume skills
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-3">
          {job.description}
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-5">
        <a
          href={job.applicationLink}
          target="_blank"
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default MatchedJobCard;