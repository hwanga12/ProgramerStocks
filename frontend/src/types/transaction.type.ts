export interface Transaction {
  id: number;
  type: "buy" | "sell";
  quantity: number;
  total_price: number;
  symbol: string;
  company_name: string;
  created_at: string;
  cash_after: number;
}
