export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About SkillMatch</h1>

      <p className="text-gray-600 mb-4">
        SkillMatch is an AI-powered job matching platform designed to connect candidates with the most relevant job opportunities based on their skills.
      </p>

      <p className="text-gray-600 mb-4">
        We analyze resumes using NLP and match them with job descriptions to calculate compatibility scores.
      </p>

      <p className="text-gray-600">
        Our goal is to reduce job search time and improve hiring accuracy using intelligent automation.
      </p>
    </div>
  );
}