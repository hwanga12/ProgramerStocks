import { create } from "zustand";

export type SortKey =
  | "symbol"
  | "profitRate"
  | "profit"
  | "average_price"
  | "valuation"
  | "quantity"
  | "valuationTotal"
  | "principal";

type SortOrder = "asc" | "desc";

interface SortState {
  sortKey: SortKey;
  sortOrder: SortOrder;
  setSortKey: (key: SortKey) => void;
}

export const useSortStore = create<SortState>((set, get) => ({
  sortKey: "symbol",
  sortOrder: "asc",
  setSortKey: (key: SortKey) => {
    const { sortKey, sortOrder } = get();
    if (sortKey === key) {
      set({ sortOrder: sortOrder === "asc" ? "desc" : "asc" });
    } else {
      set({ sortKey: key, sortOrder: "asc" });
    }
  },
}));
