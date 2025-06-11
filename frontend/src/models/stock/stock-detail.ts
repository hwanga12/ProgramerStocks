export interface IStockDetail {
  id: number;
  company_name: string;
  symbol: string;
  logo_url: string;
  market_cap: number;
  created_at: string;
  current_price: string;
  daily_prices: IStockDailyPrice[];
  time_prices: IStockTimePrice[];
}

export interface IStockDailyPrice {
  price_date: string;
  close: number;
}

export interface IStockTimePrice {
  fetched_at: string;
  price: number;
}
