"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import LoadingOverlay from "@/components/ui/loading-overlay";

type Props = {
  className?: string;
};

export default function BackButton({ className = "" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    setLoading(true);
    setTimeout(() => {
      router.back();
    }, 200); // Small delay to show overlay before navigation
  };

  return (
    <>
      {loading && <LoadingOverlay />} {/* ← Show overlay */}
      <button
        onClick={handleBack}
        className={`flex items-center gap-2 text-[#7B4019] font-medium hover:underline ${className}`}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back
      </button>
    </>
  );
}
