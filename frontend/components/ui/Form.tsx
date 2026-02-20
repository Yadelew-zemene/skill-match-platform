import React from "react"

export const Form = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      {children}
    </div>
  )
}
