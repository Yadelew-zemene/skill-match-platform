"use client";

import { useCallback, useEffect, useState } from "react";

import {
    getEmployerProfile,
    updateEmployerProfile,
} from "@/services/employer-profile.service";

import type {
    EmployerProfile,
    UpdateEmployerProfileData,
} from "@/types/employer-profile";

const emptyProfile: EmployerProfile = {
    id: null,
    employer_id: 0,
    company_name: "",
    company_description: "",
    industry: "",
    company_size: "",
    location: "",
    phone: "",
    website_url: "",
    linkedin_url: "",
    profile_image_path: null,
};

const toUpdatePayload = (
    profile: EmployerProfile,
): UpdateEmployerProfileData => ({
    company_name: profile.company_name?.trim() ?? "",
    company_description: profile.company_description?.trim() || null,
    industry: profile.industry?.trim() || null,
    company_size: profile.company_size?.trim() || null,
    location: profile.location?.trim() || null,
    phone: profile.phone?.trim() || null,
    website_url: profile.website_url?.trim() || null,
    linkedin_url: profile.linkedin_url?.trim() || null,
});

export function useEmployerProfile() {
    const [profile, setProfile] = useState<EmployerProfile>(emptyProfile);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const loadProfile = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getEmployerProfile();
            setProfile({
                ...emptyProfile,
                ...response.profile,
            });
        } catch (err: unknown) {
            console.error("Failed to load employer profile:", err);
            setError("Unable to load your company profile. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadProfile();
    }, [loadProfile]);

    const updateField = <K extends keyof EmployerProfile>(
        field: K,
        value: EmployerProfile[K],
    ) => {
        setProfile((current) => ({
            ...current,
            [field]: value,
        }));

        setSuccess(null);
        setError(null);
    };

    const saveProfile = async () => {
        if (!profile.company_name?.trim()) {
            setError("Company name is required.");
            return false;
        }

        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await updateEmployerProfile(
                toUpdatePayload(profile),
            );

            setProfile({
                ...emptyProfile,
                ...response.profile,
            });

            setSuccess(response.message || "Company profile updated successfully.");
            return true;
        } catch (err: unknown) {
            console.error("Failed to update employer profile:", err);

            const axiosError = err as {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
            };

            setError(
                axiosError.response?.data?.message ||
                "Unable to save your company profile. Please try again.",
            );

            return false;
        } finally {
            setSaving(false);
        }
    };

    return {
        profile,
        loading,
        saving,
        error,
        success,
        updateField,
        saveProfile,
        reloadProfile: loadProfile,
    };
}