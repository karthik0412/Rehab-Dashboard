import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-2xl border bg-white shadow-md p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
