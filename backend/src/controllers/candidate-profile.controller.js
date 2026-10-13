import fs from "fs/promises";
import path from "path";

import {
  getCandidateProfile,
  updateCandidateProfile,
  updateCandidateProfileImage,
  removeCandidateProfileImage,
} from "../services/candidate-profile.service.js";

const isValidUrl = (value) => {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await getCandidateProfile(req.user.id);

    return res.status(200).json({ profile });
  } catch (error) {
    console.error("Failed to get candidate profile:", error);

    return res.status(500).json({
      message: "Failed to load candidate profile",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      professional_title,
      bio,
      phone,
      location,
      linkedin_url,
      github_url,
    } = req.body;

    // Name is required when updating the profile.
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        message: "Name must not exceed 100 characters",
      });
    }

    if (
      professional_title !== undefined &&
      professional_title !== null &&
      typeof professional_title !== "string"
    ) {
      return res.status(400).json({
        message: "Professional title must be a string",
      });
    }

    if (bio !== undefined && bio !== null && typeof bio !== "string") {
      return res.status(400).json({
        message: "Bio must be a string",
      });
    }

    if (phone !== undefined && phone !== null && typeof phone !== "string") {
      return res.status(400).json({
        message: "Phone must be a string",
      });
    }

    if (
      location !== undefined &&
      location !== null &&
      typeof location !== "string"
    ) {
      return res.status(400).json({
        message: "Location must be a string",
      });
    }

    if (
      linkedin_url !== undefined &&
      linkedin_url !== null &&
      linkedin_url !== ""
    ) {
      if (typeof linkedin_url !== "string" || !isValidUrl(linkedin_url)) {
        return res.status(400).json({
          message: "LinkedIn URL must be a valid URL",
        });
      }
    }

    if (github_url !== undefined && github_url !== null && github_url !== "") {
      if (typeof github_url !== "string" || !isValidUrl(github_url)) {
        return res.status(400).json({
          message: "GitHub URL must be a valid URL",
        });
      }
    }

    if (professional_title && professional_title.trim().length > 150) {
      return res.status(400).json({
        message: "Professional title must not exceed 150 characters",
      });
    }

    if (bio && bio.trim().length > 2000) {
      return res.status(400).json({
        message: "Bio must not exceed 2000 characters",
      });
    }

    if (phone && phone.trim().length > 30) {
      return res.status(400).json({
        message: "Phone must not exceed 30 characters",
      });
    }

    if (location && location.trim().length > 150) {
      return res.status(400).json({
        message: "Location must not exceed 150 characters",
      });
    }

    if (linkedin_url && linkedin_url.length > 500) {
      return res.status(400).json({
        message: "LinkedIn URL must not exceed 500 characters",
      });
    }

    if (github_url && github_url.length > 500) {
      return res.status(400).json({
        message: "GitHub URL must not exceed 500 characters",
      });
    }

    const profile = await updateCandidateProfile(req.user.id, {
      name: name.trim(),
      professional_title: professional_title?.trim() || null,
      bio: bio?.trim() || null,
      phone: phone?.trim() || null,
      location: location?.trim() || null,
      linkedin_url: linkedin_url?.trim() || null,
      github_url: github_url?.trim() || null,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Failed to update candidate profile:", error);

    return res.status(500).json({
      message: "Failed to update candidate profile",
    });
  }
};
export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No profile image uploaded",
      });
    }

    const imagePath = req.file.path;

    const profile = await getCandidateProfile(req.user.id);

    if (profile.profile_image_path) {
      try {
        await fs.unlink(path.resolve(profile.profile_image_path));
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error("Failed to remove previous profile image:", error);
        }
      }
    }

    const updatedProfile = await updateCandidateProfileImage(
      req.user.id,
      imagePath,
    );

    return res.status(200).json({
      message: "Profile photo updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Failed to upload profile photo:", error);

    if (req.file?.path) {
      try {
        await fs.unlink(path.resolve(req.file.path));
      } catch {
        // Ignore cleanup errors.
      }
    }

    return res.status(500).json({
      message: error.message || "Failed to upload profile photo",
    });
  }
};

export const getProfilePhoto = async (req, res) => {
  try {
    const profile = await getCandidateProfile(req.user.id);

    if (!profile.profile_image_path) {
      return res.status(404).json({
        message: "Profile photo not found",
      });
    }

    const imagePath = path.resolve(profile.profile_image_path);

    try {
      await fs.access(imagePath);
    } catch {
      return res.status(404).json({
        message: "Profile photo file not found",
      });
    }

    return res.sendFile(imagePath);
  } catch (error) {
    console.error("Failed to get profile photo:", error);

    return res.status(500).json({
      message: "Failed to load profile photo",
    });
  }
};

export const deleteProfilePhoto = async (req, res) => {
  try {
    const profile = await getCandidateProfile(req.user.id);

    if (!profile.profile_image_path) {
      return res.status(404).json({
        message: "Profile photo not found",
      });
    }

    try {
      await fs.unlink(path.resolve(profile.profile_image_path));
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error("Failed to delete profile photo file:", error);
      }
    }

    const updatedProfile = await removeCandidateProfileImage(req.user.id);

    return res.status(200).json({
      message: "Profile photo removed successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Failed to remove profile photo:", error);

    return res.status(500).json({
      message: "Failed to remove profile photo",
    });
  }
};
