
interface MatchedJob {
  job_id: number;
  title: string;
  company?: string; 
  description: string;
  applicationLink: string;
  score: number;
  matched_skills: string[];
}

 const MatchedJobCard = ({ job }: { job: MatchedJob }) => {
  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-blue-600">{job.title}</h3>
        <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
          {Math.round(job.score * 100)}% Match
        </span>
      </div>
      <p className="text-sm text-gray-500 font-medium mb-2">{job.company}</p>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{job.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {job.matched_skills.map((skill) => (
          <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
            {skill}
          </span>
        ))}
      </div>

      <a 
        href={job.applicationLink} 
        target="_blank" 
        className="block text-center w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Apply Now
      </a>
    </div>
  );
};
export default MatchedJobCard
