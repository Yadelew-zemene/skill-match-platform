
import { Briefcase, Users, Target } from "lucide-react";

export const DASHBOARD_STATS = [
  {
    label: "Active Jobs",
    value: "12",
    icon: <Briefcase className="text-blue-600" size={24} />,
    bgColor: "bg-blue-50",
  },
  {
    label: "Total Candidates",
    value: "458",
    icon: <Users className="text-purple-600" size={24} />,
    bgColor: "bg-purple-50",
  },
  {
    label: "Average Match Score",
    value: "84%",
    icon: <Target className="text-green-600" size={24} />,
    bgColor: "bg-green-50",
  },
];