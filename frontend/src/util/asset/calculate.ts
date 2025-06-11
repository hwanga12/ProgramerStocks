import { StockAsset } from "../../types/asset.type";

/**
 * 종목의 평가금 계산
 * 현재가 × 수량
 */
export const calculateValuation = (stock: StockAsset): number => {
  return stock.valuation;
};

/**
 * 종목 원금 계산
 * 평균 매입가 × 수량
 */
export const calculatePrincipal = (stock: StockAsset): number => {
  return stock.average_price * stock.quantity;
};

/**
 * 종목 수익금 계산
 * 평가금 - 원금
 */
export const calculateProfit = (stock: StockAsset): number => {
  return calculateValuation(stock) - calculatePrincipal(stock);
};

/**
 * 종목 수익률 계산 (퍼센트)
 * (수익금 / 원금) × 100
 */
export const calculateProfitRate = (stock: StockAsset): number => {
  const principal = calculatePrincipal(stock);
  if (principal === 0) return 0;
  return (calculateProfit(stock) / principal) * 100;
};

/**
 * 전체 평가금 계산 (모든 종목의 평가금 합)
 */
export const calculateTotalStockValuation = (stocks: StockAsset[]): number => {
  return stocks.reduce((sum, stock) => sum + calculateValuation(stock), 0);
};

/**
 * 전체 원금 계산 (모든 종목의 원금 합)
 */
export const calculateTotalPrincipal = (stocks: StockAsset[]): number => {
  return stocks.reduce((sum, stock) => sum + calculatePrincipal(stock), 0);
};

/**
 * 전체 수익금 계산 (모든 종목의 수익 합)
 */
export const calculateTotalProfit = (stocks: StockAsset[]): number => {
  return stocks.reduce((sum, stock) => sum + calculateProfit(stock), 0);
};

/**
 * 전체 수익률 계산 (모든 종목 수익금 / 전체 원금 × 100)
 */
export const calculateTotalProfitRate = (stocks: StockAsset[]): number => {
  const principal = calculateTotalPrincipal(stocks);
  if (principal === 0) return 0;
  return (calculateTotalProfit(stocks) / principal) * 100;
};
