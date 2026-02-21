"use client";

import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  className?: string;
}

export function Form({ children, className }: FormProps) {
  return (
    <div
      className={`w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border ${className}`}
    >
      {children}
    </div>
  );
}