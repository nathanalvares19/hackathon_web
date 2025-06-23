import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="flex items-center justify-center h-screen bg-[#FFEEA9] overflow-hidden">
      <div className="text-center px-4">
        <h1 className="text-5xl font-extrabold mb-6 text-[#7B4019]">
          Welcome to the Canteen Pooling System
        </h1>
        <p className="text-lg mb-10 text-[#7B4019] max-w-xl mx-auto">
          Team up for canteen orders. Save time and share pickups smartly.
        </p>

        <div className="inline-flex rounded-full shadow-lg border-2 border-[#7B4019] overflow-hidden gap-[2px] bg-[#7B4019]">
          <Link
            href="/signin"
            className="font-bold px-8 py-3 text-lg bg-[#FF7D29] text-white hover:bg-[#e4661d] transition rounded-l-full"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="font-bold px-8 py-3 text-lg bg-[#FFEEA9] text-[#7B4019] hover:bg-[#FFBF78] transition rounded-r-full"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
