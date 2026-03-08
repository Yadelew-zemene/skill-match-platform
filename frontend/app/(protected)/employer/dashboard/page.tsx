"use client";
import { DASHBOARD_STATS } from "@/app/constants/employer-dashboard"; 

export default function EmployerDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ... Header Section ... */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {DASHBOARD_STATS.map((stat, index) => (
          <div key={index} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`p-4 ${stat.bgColor} rounded-2xl`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
      
     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
             
          </div>
          <h3 className="text-lg font-bold text-gray-900">Recent Job Activity</h3>
          <p className="text-gray-500 mt-2">
            Your most recently posted jobs will appear here. Start by posting a new position to see candidate matches.
          </p>
        </div>
      </div>
    </div>
  );
}