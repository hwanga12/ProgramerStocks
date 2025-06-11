import { requestHandler } from "./http";
import { Portfolio } from "@/types/asset.type";

export const fetchMyAssets = (): Promise<Portfolio> => {
  return requestHandler("get", "/assets/me").then((res) => {
    return res;
  });
};
