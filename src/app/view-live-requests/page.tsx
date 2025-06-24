"use client";

import { useRequestStore } from "@/lib/store";
import RequestCard from "@/components/ui/request-card";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/ui/loading-overlay";
import BackButton from "@/components/ui/back-button";

export default function ViewRequests() {
  const requests = useRequestStore((state) => state.requests);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white px-4 py-10 overflow-y-auto relative">
      {/* {isPending && <LoadingOverlay />} */}
      <BackButton className="fixed top-4 left-4 z-50" />

      <h2 className="text-4xl font-bold text-center text-[#7B4019] mb-8 font-poppins">
        Live Requests
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {requests.length === 0 ? (
          <p className="text-center text-[#7B4019] text-lg col-span-full">
            No requests yet.
          </p>
        ) : (
          requests.map((request, index) => (
            <RequestCard
              key={index}
              itemName={request.itemName}
              itemQuantity={request.itemQuantity}
              itemSource={request.itemSource}
              variant="fade" // or "flip"
            />
          ))
        )}
      </div>
    </main>
  );
}
