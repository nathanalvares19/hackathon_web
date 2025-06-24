import { create } from "zustand";
import { persist } from "zustand/middleware";

type Request = {
  itemName: string;
  itemQuantity: number;
  itemSource: string;
};

type RequestStore = {
  requests: Request[];
  addRequest: (request: Request) => void;
  clearRequests: () => void;
};

// Optional: add persist middleware so store survives refresh (can remove if not needed)
export const useRequestStore = create<RequestStore>()(
  persist(
    (set) => ({
      requests: [],
      addRequest: (request) =>
        set((state) => ({
          requests: [...state.requests, request],
        })),
      clearRequests: () => set({ requests: [] }),
    }),
    {
      name: "request-storage", // localStorage key
    }
  )
);
