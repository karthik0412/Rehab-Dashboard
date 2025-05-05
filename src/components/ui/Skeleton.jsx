import React from "react";

export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-neutral-200 rounded ${className}`} />
  );
}
