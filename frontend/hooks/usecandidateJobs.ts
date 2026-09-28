"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getCandidateDashboard } from "@/services/candidate.service";
import { MatchedJob } from "@/types/candidateDashboard";
import toast from "react-hot-toast";

export const useCandidateJobs = () => {
  const { token } = useAuth();

  const [jobs, setJobs] = useState<MatchedJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    if (!token) {
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getCandidateDashboard();

      setJobs(data.matchedJobs ?? []);
    } catch (error) {
      console.error("Failed to load candidate dashboard:", error);
      toast.error("Failed to load dashboard");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    refresh: fetchJobs,
  };
};