"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchEmployerJobs } from "@/services/job.service";
import JobCard from "@/components/ui/JobCard";
import toast from "react-hot-toast";

interface Job {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    fetchEmployerJobs(user.id)
      .then((data) => setJobs(data))
      .catch((err) => toast.error("Failed to fetch jobs"))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>
      {loading && <p>Loading jobs...</p>}
      {!loading && jobs.length === 0 && <p>No jobs posted yet.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};
export default EmployerDashboard;
