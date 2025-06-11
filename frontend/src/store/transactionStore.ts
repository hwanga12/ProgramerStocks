import { create } from "zustand";
import { Transaction } from "@/types/transaction.type";
import { fetchMyTransactions } from "@/api/transaction.api";

interface TransactionState {
  transactions: Transaction[];
  selectedTransactionId: number | null;
  selectTransaction: (id: number | null) => void;
  fetchTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  selectedTransactionId: null,
  selectTransaction: (id) => set({ selectedTransactionId: id }),

  fetchTransactions: async () => {
    try {
      const data = await fetchMyTransactions();
      set({ transactions: data });
    } catch (err) {
      console.error("거래 내역 불러오기 실패", err);
    }
  },
}));
