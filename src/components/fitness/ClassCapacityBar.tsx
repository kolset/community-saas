"use client";

export default function ClassCapacityBar({ booked, capacity }: { booked: number; capacity: number }) {
  const percentage = Math.round((booked / capacity) * 100);
  const color = percentage >= 90 ? "bg-error-500" : percentage >= 70 ? "bg-warning-500" : "bg-success-500";

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{booked}/{capacity}</span>
    </div>
  );
}
