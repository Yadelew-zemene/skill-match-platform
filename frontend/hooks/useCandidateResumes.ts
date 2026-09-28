"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
    getMyResumes,
    uploadResume,
    activateResume,
    deleteResume,
} from "@/services/resume.service";
import { Resume } from "@/types/resume";
import toast from "react-hot-toast";

export const useCandidateResumes = () => {
    const { token } = useAuth();

    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [actionLoading, setActionLoading] = useState<number | null>(null);

    const fetchResumes = useCallback(async () => {
        if (!token) {
            setResumes([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const data = await getMyResumes();

            setResumes(data);
        } catch (error) {
            console.error("Failed to load resumes:", error);
            toast.error("Failed to load resumes");
            setResumes([]);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchResumes();
    }, [fetchResumes]);

    const upload = async (file: File) => {
        try {
            setUploading(true);

            await uploadResume(file);

            toast.success("Resume uploaded successfully");

            await fetchResumes();
        } catch (error: any) {
            console.error("Resume upload failed:", error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to upload resume"
            );

            throw error;
        } finally {
            setUploading(false);
        }
    };

    const activate = async (resumeId: number) => {
        try {
            setActionLoading(resumeId);

            await activateResume(resumeId);

            toast.success("Resume activated");

            await fetchResumes();
        } catch (error: any) {
            console.error("Resume activation failed:", error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to activate resume"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const remove = async (resumeId: number) => {
        try {
            setActionLoading(resumeId);

            await deleteResume(resumeId);

            toast.success("Resume deleted");

            await fetchResumes();
        } catch (error: any) {
            console.error("Resume deletion failed:", error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to delete resume"
            );
        } finally {
            setActionLoading(null);
        }
    };

    return {
        resumes,
        loading,
        uploading,
        actionLoading,
        upload,
        activate,
        remove,
        refresh: fetchResumes,
    };
};