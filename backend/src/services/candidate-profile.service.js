import User from "../models/user.model.js";
import Resume from "../models/resume.model.js";
import CandidateProfile from "../models/candidate-profile.model.js";

const getOrCreateProfile = async (userId) => {
  let profile = await CandidateProfile.findByUserId(userId);

  if (!profile) {
    await CandidateProfile.create(userId);
    profile = await CandidateProfile.findByUserId(userId);
  }

  return profile;
};

export const getCandidateProfile = async (userId) => {
  const profile = await getOrCreateProfile(userId);

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const activeResume = await Resume.findActiveByUserId(userId);

  let skills = [];

  if (activeResume) {
    skills = await Resume.findSkillsByResumeId(activeResume.id);
  }

  return {
    id: profile.id,
    name: user.name,
    email: user.email,
    profile_image_path: profile.profile_image_path,
    professional_title: profile.professional_title,
    bio: profile.bio,
    phone: profile.phone,
    location: profile.location,
    linkedin_url: profile.linkedin_url,
    github_url: profile.github_url,
    skills,
    resume: activeResume
      ? {
          id: activeResume.id,
          original_filename: activeResume.original_filename,
          status: activeResume.status,
          is_active: activeResume.is_active,
        }
      : null,
  };
};

export const updateCandidateProfile = async (userId, data) => {
  const profile = await getOrCreateProfile(userId);

  const {
    name,
    professional_title,
    bio,
    phone,
    location,
    linkedin_url,
    github_url,
  } = data;

  if (name !== undefined) {
    await User.updateName(userId, name);
  }

  await CandidateProfile.updateByUserId(userId, {
    professional_title,
    bio,
    phone,
    location,
    linkedin_url,
    github_url,
  });

  return getCandidateProfile(userId);
};
export const updateCandidateProfileImage = async (userId, imagePath) => {
  await getOrCreateProfile(userId);

  await CandidateProfile.updateProfileImage(userId, imagePath);

  return getCandidateProfile(userId);
};

export const removeCandidateProfileImage = async (userId) => {
  await getOrCreateProfile(userId);

  await CandidateProfile.clearProfileImage(userId);

  return getCandidateProfile(userId);
};