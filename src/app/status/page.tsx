"use client";

import { useRequestStore } from "@/lib/store";
import BackButton from "@/components/ui/back-button";

export default function StatusPage() {
  const requests = useRequestStore((state) => state.requests);

  return (
    <main className="min-h-screen bg-[#FFEEA9] px-4 py-10">
      <BackButton className="fixed top-4 left-4 z-50" />

      <h2 className="text-3xl font-bold text-center text-[#7B4019] mb-8 font-poppins">
        Request Status
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-[#7B4019] text-lg font-medium">
          No requests yet.
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {requests.map((req, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 border border-[#d6c7ae] flex justify-between items-center"
            >
              <div>
                <p className="text-[#7B4019] font-semibold text-base">
                  {req.itemName} ({req.itemQuantity})
                </p>
                <p className="text-sm text-[#7B4019] opacity-80">
                  Source: {req.itemSource}
                </p>
              </div>

              {/* Static status for now */}
              <span className="text-sm px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 font-medium">
                Pending
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
