import {
  getEmployerProfile,
  updateEmployerProfile,
} from "../services/employer-profile.service.js";

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
    const profile = await getEmployerProfile(req.user.id);

    return res.status(200).json({
      profile,
    });
  } catch (error) {
    console.error("Failed to get employer profile:", error);

    return res.status(500).json({
      message: "Failed to load employer profile",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      company_name,
      description,
      industry,
      company_size,
      location,
      phone,
      website_url,
      linkedin_url,
    } = req.body;

    // Name is optional here if your frontend only edits company profile.
    // If name is not sent, keep the existing user name.
    if (name !== undefined && (typeof name !== "string" || !name.trim())) {
      return res.status(400).json({
        message: "Name must be a non-empty string",
      });
    }

    if (name && name.trim().length > 100) {
      return res.status(400).json({
        message: "Name must not exceed 100 characters",
      });
    }

    if (
      company_name !== undefined &&
      company_name !== null &&
      typeof company_name !== "string"
    ) {
      return res.status(400).json({
        message: "Company name must be a string",
      });
    }

    if (!company_name || !company_name.trim()) {
      return res.status(400).json({
        message: "Company name is required",
      });
    }

    if (company_name.trim().length > 150) {
      return res.status(400).json({
        message: "Company name must not exceed 150 characters",
      });
    }

    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return res.status(400).json({
        message: "Description must be a string",
      });
    }

    if (description && description.trim().length > 2000) {
      return res.status(400).json({
        message: "Description must not exceed 2000 characters",
      });
    }

    if (
      industry !== undefined &&
      industry !== null &&
      typeof industry !== "string"
    ) {
      return res.status(400).json({
        message: "Industry must be a string",
      });
    }

    if (
      company_size !== undefined &&
      company_size !== null &&
      typeof company_size !== "string"
    ) {
      return res.status(400).json({
        message: "Company size must be a string",
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

    if (phone !== undefined && phone !== null && typeof phone !== "string") {
      return res.status(400).json({
        message: "Phone must be a string",
      });
    }

    if (
      website_url !== undefined &&
      website_url !== null &&
      website_url !== ""
    ) {
      if (typeof website_url !== "string" || !isValidUrl(website_url)) {
        return res.status(400).json({
          message: "Website URL must be a valid URL",
        });
      }
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

    if (location && location.trim().length > 150) {
      return res.status(400).json({
        message: "Location must not exceed 150 characters",
      });
    }

    if (phone && phone.trim().length > 30) {
      return res.status(400).json({
        message: "Phone must not exceed 30 characters",
      });
    }

    if (website_url && website_url.length > 500) {
      return res.status(400).json({
        message: "Website URL must not exceed 500 characters",
      });
    }

    if (linkedin_url && linkedin_url.length > 500) {
      return res.status(400).json({
        message: "LinkedIn URL must not exceed 500 characters",
      });
    }

    const profile = await updateEmployerProfile(req.user.id, {
      name: name?.trim(),
      company_name: company_name.trim(),
      company_description: description?.trim() || null,
      industry: industry?.trim() || null,
      company_size: company_size?.trim() || null,
      location: location?.trim() || null,
      phone: phone?.trim() || null,
      website_url: website_url?.trim() || null,
      linkedin_url: linkedin_url?.trim() || null,
    });

    return res.status(200).json({
      message: "Employer profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Failed to update employer profile:", error);

    return res.status(500).json({
      message: "Failed to update employer profile",
    });
  }
};
