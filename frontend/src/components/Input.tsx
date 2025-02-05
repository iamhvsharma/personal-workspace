import React from "react";

type InputProps = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={`
          w-full rounded-lg border border-gray-300 bg-white px-4 py-2
          text-gray-900 placeholder-gray-500 focus:border-blue-500 
          focus:outline-none focus:ring-1 focus:ring-blue-500
          dark:border-gray-600 dark:bg-[#09090b] dark:text-gray-100
          dark:placeholder-gray-400 dark:focus:border-blue-400
          dark:focus:ring-blue-400 ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
