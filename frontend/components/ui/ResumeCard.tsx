"use client";

interface ResumeCardProps {
  resume: {
    file_path: string;
    extracted_text: string;
    match_scores: { job_title: string; score: number }[];
  };
}

export default function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="font-semibold text-lg text-gray-800 mb-2">
        Resume: {resume.file_path.split("/").pop()}
      </h2>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-1">Extracted Skills:</h3>
        <p className="text-gray-600 text-sm">{resume.extracted_text || "N/A"}</p>
      </div>

      {resume.match_scores.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-700 mb-1">Job Matches:</h3>
          <ul className="space-y-1">
            {resume.match_scores.map((match, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-3 py-1 bg-gray-100 rounded"
              >
                <span>{match.job_title}</span>
                <span className="font-semibold">{match.score}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}