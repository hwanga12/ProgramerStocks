import { create } from "zustand";
import { fetchMyAssets } from "@/api/asset.api";
import { Portfolio } from "@/types/asset.type";

interface AssetState extends Portfolio {
  fetchAssets: () => Promise<void>;
}

export const useAssetStore = create<AssetState>((set) => ({
  cash: 0,
  totalAsset: 0,
  stocks: [],
  fetchAssets: async () => {
    try {
      const data = await fetchMyAssets();
      set({
        cash: data.cash,
        totalAsset: data.totalAsset,
        stocks: data.stocks,
      });
    } catch (err) {
      console.error("자산 불러오기 실패", err);
    }
  },
}));
