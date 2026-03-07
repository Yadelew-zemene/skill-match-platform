"use client";

import { useState } from "react";
import { postJobs } from "@/services/job.service";
import toast from "react-hot-toast";
interface Job {
  title: string;
  company: string;
  application_link: string;
  description: string;
}
export default function PostJobPage() {
  const[job,setJob] = useState<Job>(
    {
      title:"",
      company:"",
      description:"",
      application_link:""
    }
  )


 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setJob({
    ...job,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async () => {
  try {
    await postJobs(job);

    toast.success("Job posted successfully");

    setJob({
      title: "",
      company: "",
      application_link: "",
      description: "",
    });
  } catch {
    toast.error("Failed to post job");
  }
};
  return (
    <div className="max-w-xl">

      <h1 className="text-2xl font-bold mb-6">Post a Job</h1>

      <input
        className="w-full border p-2 mb-4"
        placeholder="Job Title"
        onChange={handleChange}
      />

      <input
        className="w-full border p-2 mb-4"
        placeholder="Company Name"
        onChange={handleChange}
      />

      <input
        className="w-full border p-2 mb-4"
        placeholder="Application Link"
        onChange={handleChange}
      />

      <textarea
        className="w-full border p-2 mb-4"
        placeholder="Job Description"
        rows={6}
        onChange={handleChange}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Post Job
      </button>
    </div>
  );
}