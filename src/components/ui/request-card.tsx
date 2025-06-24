"use client";

import { cn } from "@/lib/utils";
import "../../app/flip-card.css";

type Props = {
  itemName: string;
  itemQuantity: number;
  itemSource: string;
  variant?: "flip" | "fade";
};

export default function RequestCard({
  itemName,
  itemQuantity,
  itemSource,
  variant = "fade",
}: Props) {
  const isFlip = variant === "flip";

  return (
    <div
      className={cn(
        "relative w-full h-60 perspective",
        isFlip ? "flip-card" : "fade-card group"
      )}
    >
      <div
        className={cn(
          "w-full h-full",
          isFlip
            ? "flip-card-inner"
            : "bg-white border border-neutral-200 rounded-xl shadow-md p-4"
        )}
      >
        {/* Front */}
        <div
          className={cn(
            isFlip
              ? "flip-card-front"
              : "absolute inset-0 flex flex-col items-center justify-center bg-[#ffeda3] text-[#7B4019] group-hover:opacity-0 transition-opacity duration-300 z-10 rounded-xl"
          )}
        >
          <p className="text-xl font-medium">{itemSource}</p>
          <h2 className="text-2xl font-bold">{itemQuantity} item(s)</h2>
        </div>

        {/* Back */}
        <div
          className={cn(
            isFlip
              ? "flip-card-back"
              : "absolute inset-0 flex flex-col items-center justify-center bg-[#fff4d6] text-[#7B4019] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 rounded-xl p-4"
          )}
        >
          <p className="text-lg font-semibold">Item: {itemName}</p>
          <p className="text-lg font-semibold">Quantity: {itemQuantity}</p>
          <p className="text-lg font-semibold">Source: {itemSource}</p>
        </div>
      </div>
    </div>
  );
}
