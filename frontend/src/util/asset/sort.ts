import { StockAsset } from "@/types/asset.type";
import {
  calculatePrincipal,
  calculateProfitRate,
  calculateValuation,
} from "@/util/asset/calculate";
import { SortKey } from "@/store/sortStore";

export const sortStocks = (
  stocks: StockAsset[],
  sortKey: SortKey,
  sortOrder: "asc" | "desc"
): StockAsset[] => {
  const getValue = (stock: StockAsset): string | number => {
    switch (sortKey) {
      case "symbol":
        return stock.symbol;
      case "profit":
        return stock.profit;
      case "profitRate":
        return calculateProfitRate(stock);
      case "average_price":
        return stock.average_price;
      case "valuation":
        return stock.valuation;
      case "quantity":
        return stock.quantity;
      case "valuationTotal":
        return calculateValuation(stock);
      case "principal":
        return calculatePrincipal(stock);
      default:
        return 0;
    }
  };

  return [...stocks].sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortOrder === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });
};
