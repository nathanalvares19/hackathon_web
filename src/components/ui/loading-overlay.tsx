"use client";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-[#fff4d6] bg-opacity-90 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#7B4019] border-opacity-60" />
    </div>
  );
}
