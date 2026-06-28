"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getCandidateDashboard } from "@/services/candidate.service";
import { MatchedJob } from "@/types/candidateDashboard";
import toast from "react-hot-toast";

export const useCandidateJobs = () => {
  const { token } = useAuth();

  const [jobs, setJobs] = useState<MatchedJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const data = await getCandidateDashboard(token);
      setJobs(data.matchedJobs || []);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  return {
    jobs,
    loading,
    refresh: fetchJobs,
  };
};