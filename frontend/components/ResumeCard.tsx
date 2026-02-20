interface ResumeCardProps {
  resume: {
    id: number;
    file_path: string;
    extracted_text: string;
    skills: string[];
    matches?: { jobTitle: string; score: number }[];
  };
}

const ResumeCard = ({ resume }: ResumeCardProps) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="font-bold mb-2">Resume #{resume.id}</h2>
      <p className="text-gray-600 mb-2">{resume.extracted_text.slice(0, 100)}...</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {resume.skills?.map((skill) => (
          <span
            key={skill}
            className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {resume.matches && (
        <div className="mt-2">
          <h3 className="font-semibold mb-1">Job Matches:</h3>
          {resume.matches.map((m) => (
            <div key={m.jobTitle} className="flex justify-between text-sm mb-1">
              <span>{m.jobTitle}</span>
              <span>{m.score}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeCard;