"use client";

import { useEffect, useState } from "react";
import { fetchEmployerJobs } from "@/services/job.service"; 
import { useAuth } from "@/contexts/AuthContext";
import { Edit2, Trash2, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export default function JobsPostedPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchEmployerJobs(user.id)
        .then(setJobs)
        .catch(() => toast.error("Failed to load jobs"))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Postings</h1>
        <p className="text-gray-500">View and track all the job opportunities you've created.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Details</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Posted</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicants</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-8 bg-gray-50/50"></td>
                </tr>
              ))
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                  No jobs posted yet.
                </td>
              </tr>
            ) : (
              jobs.map((job: any) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-400">{job.companyName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(job.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                      0 Applied
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-gray-400 hover:text-blue-600"><Edit2 size={18} /></button>
                    <button className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}