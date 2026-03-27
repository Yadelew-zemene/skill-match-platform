// components/employer/CandidateModal.tsx
import { X, Download, Mail, User, Award } from "lucide-react";

export default function CandidateModal({ isOpen, onClose, candidates, jobTitle }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Talent Pool</h2>
            <p className="text-sm text-blue-600 font-medium">Position: {jobTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {candidates.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No matches found for this position yet.</div>
          ) : (
            <div className="grid gap-4">
              {candidates.map((can: any, idx: number) => (
                <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-xl hover:border-blue-300 transition-all bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <User size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{can.name}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail size={14} /> {can.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 my-4 md:my-0">
                    <div className="text-center">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Match Score</p>
                      <div className="flex items-center gap-1">
                        <Award size={16} className={can.score > 80 ? "text-green-500" : "text-blue-500"} />
                        <span className={`text-xl font-black ${can.score > 80 ? "text-green-600" : "text-blue-600"}`}>
                          {Math.round(can.score)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={can.file_path} 
                    target="_blank"
                    className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors"
                  >
                    <Download size={16} /> Resume
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}