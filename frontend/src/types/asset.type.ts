export interface StockAsset {
  symbol: string;
  quantity: number;
  average_price: number; // 1주당 매입가
  current_price: number; // 현재 1주 가격
  valuation: number; // 평가금(현재 1주 가격 * 수량)
  profit: number; // 총 수익금
}

export interface Portfolio {
  cash: number; // 원금
  totalAsset: number; // 현재 자산 = 현금 + 평가금
  stocks: StockAsset[]; // 종목 리스트
}
