
import { UserRole } from "@/types/auth";

export const getDashboardRoute = (role: UserRole) => {
  switch (role) {
    case "candidate":
      return "/candidate/dashboard";
    case "employer":
      return "/employer/dashboard";
    default:
      return "/login";
  }
};