import { requestHandler } from "./http";
import { Transaction } from "@/types/transaction.type";

export const fetchMyTransactions = async (): Promise<Transaction[]> => {
  const res = await requestHandler("get", "/transactions/me");
  return Array.isArray(res.transactions) ? res.transactions : [];
};
