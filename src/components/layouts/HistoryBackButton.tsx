"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const HistoryBackButton = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center space-x-4 hover:text-blue"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Go back</span>
    </button>
  );
};
