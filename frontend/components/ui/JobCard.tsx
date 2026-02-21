"use client";

import Link from "next/link";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    description: string;
    created_at: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition">
      <h2 className="font-semibold text-lg">{job.title}</h2>
      <p className="text-gray-600 text-sm mt-1 line-clamp-3">{job.description}</p>
      <p className="text-gray-400 text-xs mt-2">
        Posted: {new Date(job.created_at).toLocaleDateString()}
      </p>
      <Link
        href={`/employer/job/${job.id}/candidates`}
        className="mt-3 inline-block text-blue-500 hover:underline text-sm"
      >
        View Candidates
      </Link>
    </div>
  );
};

export default JobCard;