"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { WobbleCard } from "@/components/ui/wobble-card";
import { MovingBorder } from "@/components/ui/moving-border";
import { BackgroundLines } from "@/components/ui/background-lines";
import { useRequestStore } from "@/lib/store";
import LoadingOverlay from "@/components/ui/loading-overlay";

// ✅ Toggle settings here
const SHOW_BACKGROUND_LINES = true;
const SHOW_MOVING_BORDER = false;

export default function Dashboard() {
  const requests = useRequestStore((state) => state.requests);
  const liveRequestCount = requests.length;

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const navigate = (path: string) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const content = (
    <main className="flex items-center justify-center px-4 min-h-screen bg-white">
      {isPending && <LoadingOverlay />}
      <div
        className={`${
          SHOW_MOVING_BORDER ? "relative p-[1px]" : ""
        } rounded-xl w-fit h-fit`}
      >
        {/* 🌀 Moving Border effect */}
        {SHOW_MOVING_BORDER && (
          <div className="absolute inset-0 z-0 rounded-xl overflow-hidden">
            <MovingBorder duration={4000} rx="16" ry="16">
              <div className="h-20 w-20 bg-[radial-gradient(#7B4019_40%,transparent_60%)] opacity-80" />
            </MovingBorder>
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-10 border border-[#d6c7ae] rounded-xl p-4 shadow-md bg-[#FFEEA9]">
          <div className="flex gap-2">
            {/* Left Column */}
            <div className="flex flex-col gap-2">
              {/* Create Request */}
              <button onClick={() => navigate("/create-request")}>
                <WobbleCard containerClassName="w-[180px] h-[160px] bg-white cursor-pointer">
                  <div className="w-full h-full flex items-center justify-center text-[#7B4019] font-poppins text-3xl">
                    Create request
                  </div>
                </WobbleCard>
              </button>

              {/* Status */}
              <button onClick={() => navigate("/status")}>
                <WobbleCard containerClassName="w-[180px] h-[255px] bg-[#FFEEA9] cursor-pointer">
                  <div className="w-full h-full flex items-center justify-center text-[#7B4019] font-poppins text-6xl rotate-90">
                    Status
                  </div>
                </WobbleCard>
              </button>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-2">
              {/* Log Out */}
              <button onClick={() => navigate("/sign-in")}>
                <WobbleCard containerClassName="w-[260px] h-[70px] bg-[#FFBF78] cursor-pointer">
                  <div className="flex items-center justify-center gap-2 w-full h-full text-[#7B4019] font-poppins text-2xl">
                    Log out
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                </WobbleCard>
              </button>

              {/* Live Requests */}
              <button onClick={() => navigate("/view-live-requests")}>
                <WobbleCard containerClassName="w-[260px] h-[350px] bg-[#FFEEA9] cursor-pointer">
                  <div className="w-full h-full py-4 flex flex-col items-center justify-start text-[#7B4019] font-poppins text-3xl">
                    <span className="mb-6 text-left">Live Requests</span>
                    <div className="bg-white px-20 py-20 rounded-xl shadow flex items-center gap-3 text-lg font-semibold relative">
                      <span className="text-[#7B4019] text-5xl">
                        {liveRequestCount}
                      </span>
                      <span className="absolute top-2 right-2 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
                      </span>
                    </div>
                  </div>
                </WobbleCard>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return SHOW_BACKGROUND_LINES ? (
    <BackgroundLines className="min-h-screen bg-white">
      {content}
    </BackgroundLines>
  ) : (
    content
  );
}
