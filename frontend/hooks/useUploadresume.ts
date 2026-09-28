"use client";

import { useState } from "react";
import {
    uploadResume,
    UploadResumeResponse,
} from "@/services/resume.service";

export const useUploadResume = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<UploadResumeResponse | null>(null);

    const upload = async (file: File) => {
        setUploading(true);
        setError(null);
        setResult(null);

        try {
            const response = await uploadResume(file);

            setResult(response);

            return response;
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Failed to upload and process resume";

            setError(message);

            throw new Error(message);
        } finally {
            setUploading(false);
        }
    };

    return {
        upload,
        uploading,
        error,
        result,
    };
};