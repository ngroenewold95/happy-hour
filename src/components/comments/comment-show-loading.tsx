"use client";

import { Skeleton } from "@heroui/react";

export default function CommentShowLoading() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-40" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}
