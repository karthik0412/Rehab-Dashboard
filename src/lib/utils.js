import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs)); // ← FIXED: spread inputs here
}

export function formatNumber(num) {
  return num.toFixed(1);
}

export function formatDate(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export function getFlexionCategory(value) {
  if (value <= 112) return 'Neutral';
  if (value <= 225) return 'Mid';
  return 'Full';
}

export function getFlexionCategoryColor(category) {
  switch (category) {
    case 'Neutral':
      return 'text-flexion-neutral';
    case 'Mid':
      return 'text-flexion-mid';
    case 'Full':
      return 'text-flexion-full';
    default:
      return 'text-gray-500';
  }
}
