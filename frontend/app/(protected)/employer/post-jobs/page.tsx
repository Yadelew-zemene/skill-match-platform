"use client";

import { useState } from "react";
import { postJobs } from "@/services/job.service";
import toast from "react-hot-toast";
import { Briefcase, Link, Building, AlignLeft } from "lucide-react"; 


export default function PostJobPage() {
  
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [application_link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
    if (!title || !company || !application_link || !description) {
      return toast.error("Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      await postJobs({
        title,
        company,
        application_link,
        description
          
      });
      toast.success("Job posted succefully")

      setTitle("");
      setCompany("");
      setLink("");
      setDescription("");

    } catch (err) {
      toast.error("try gain")
    } finally {
      setIsSubmitting(false);
    }
   
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-blue-600 p-6">
            <h1 className="text-2xl font-bold text-white">Post a New Opening</h1>
            <p className="text-blue-100 text-sm mt-1">Fill in the details to find your next great hire.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Briefcase size={16} className="text-blue-500" /> Job Title
              </label>
              <input
                type="text"
                value={title}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. Senior Full Stack Developer"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Building size={16} className="text-blue-500" /> Company Name
              </label>
              <input
                type="text"
                value={company}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. TechFlow Solutions"
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* Application Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Link size={16} className="text-blue-500" /> Application Link
              </label>
              <input
                type="url"
                value={application_link}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="https://company.com/careers/apply"
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <AlignLeft size={16} className="text-blue-500" /> Job Description
              </label>
              <textarea
                value={description}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Describe the role, requirements, and benefits..."
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-bold text-white transition-all shadow-lg ${
                isSubmitting 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98]"
              }`}
            >
              {isSubmitting ? "Posting..." : "Publish Job Posting"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}