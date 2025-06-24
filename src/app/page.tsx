"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/ui/loading-overlay";

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRedirect = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      router.push(path);
    }, 300); // Optional short delay
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      <section className="flex items-center justify-center h-screen bg-[#FFEEA9] overflow-hidden">
        <div className="text-center px-4">
          <h1 className="text-5xl font-extrabold mb-6 text-[#7B4019]">
            Welcome to the Canteen Pooling System
          </h1>
          <p className="text-lg mb-10 text-[#7B4019] max-w-xl mx-auto">
            Team up for canteen orders. Save time and share pickups smartly.
          </p>

          <div className="inline-flex rounded-full shadow-lg border-2 border-[#7B4019] overflow-hidden gap-[2px] bg-[#7B4019]">
            <button
              onClick={() => handleRedirect("/sign-in")}
              className="font-bold px-8 py-3 text-lg bg-[#FF7D29] text-white hover:bg-[#e4661d] transition rounded-l-full"
            >
              Sign In
            </button>
            <button
              onClick={() => handleRedirect("/sign-up")}
              className="font-bold px-8 py-3 text-lg bg-[#FFEEA9] text-[#7B4019] hover:bg-[#FFBF78] transition rounded-r-full"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
