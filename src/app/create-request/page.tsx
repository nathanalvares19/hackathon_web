"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useRequestStore } from "@/lib/store";
import LoadingOverlay from "@/components/ui/loading-overlay"; // ✅ import
import BackButton from "@/components/ui/back-button";

export default function CreateRequest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addRequest = useRequestStore((state) => state.addRequest);
  const [formError, setFormError] = useState(false);
  const [isPending, startTransition] = useTransition(); // ✅ transition hook
  const router = useRouter();

  const onSubmit = (data: any) => {
    const hasErrors = Object.keys(errors).length > 0;
    setFormError(hasErrors);
    if (!hasErrors) {
      startTransition(() => {
        addRequest(data);
        router.push("/dashboard"); // ✅ Redirect with loader
      });
    }
  };

  const renderError = (msg: string) => (
    <p className="flex items-center text-sm text-red-600 mb-1 mt-1">
      <ExclamationCircleIcon className="w-4 h-4 mr-1 text-red-600" />
      {msg}
    </p>
  );

  return (
    <main className="min-h-screen bg-[#FFEEA9] flex items-center justify-center px-4 relative">
      {/* {isPending && <LoadingOverlay />}  */}
      <BackButton className="fixed top-4 left-4 z-50" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={`bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6 transition-all ${
          formError ? "shake" : ""
        }`}
      >
        <h2 className="font-bold text-3xl font-poppins text-[#7B4019] text-center">
          Create Request
        </h2>

        {/* Item Name */}
        <div className="flex flex-col">
          <label className="text-[#7B4019] font-medium mb-1">
            What do you want?
          </label>
          <input
            {...register("itemName", { required: true })}
            type="text"
            placeholder="e.g. Samosa, Chai"
            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4019] ${
              errors.itemName
                ? "border-red-500 bg-red-50"
                : "border-[#d6c7ae] bg-white"
            }`}
          />
          {errors.itemName && renderError("This field is required")}
        </div>

        {/* Item Quantity */}
        <div className="flex flex-col">
          <label className="text-[#7B4019] font-medium mb-1">How much?</label>
          <input
            {...register("itemQuantity", { required: true, min: 1 })}
            type="number"
            min={1}
            placeholder="e.g. 2"
            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4019] ${
              errors.itemQuantity
                ? "border-red-500 bg-red-50"
                : "border-[#d6c7ae] bg-white"
            }`}
          />
          {errors.itemQuantity && renderError("Enter a valid quantity")}
        </div>

        {/* Item Source */}
        <div className="flex flex-col">
          <label className="text-[#7B4019] font-medium mb-1">Where from?</label>
          <select
            {...register("itemSource", { required: true })}
            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4019] ${
              errors.itemSource
                ? "border-red-500 bg-red-50"
                : "border-[#d6c7ae] bg-white"
            }`}
          >
            <option value="">Select source</option>
            <option value="canteen">Canteen</option>
            <option value="sampoorna">Sampoorna</option>
          </select>
          {errors.itemSource && renderError("Select a source")}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#7B4019] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#5e3014] transition font-poppins"
        >
          Create
        </button>
      </form>
    </main>
  );
}
