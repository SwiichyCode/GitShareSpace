"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const HistoryBackButton = () => {
  const router = useRouter();

  return (
    <button
      className="hover:text-blue flex items-center space-x-4"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Go back</span>
    </button>
  );
};
