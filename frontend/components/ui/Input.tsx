import React from "react"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input: React.FC<Props> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
      />
    </div>
  )
}
