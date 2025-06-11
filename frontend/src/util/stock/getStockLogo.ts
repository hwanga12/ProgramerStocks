export const getStockLogoUrl = (symbol: string): string => {
  const map: Record<string, string> = {
    TSLA: "Tesla.png",
    AAPL: "Apple.png",
    DIS: "Disney.png",
    NFLX: "Netflix.png",
    NVDA: "Nvidia.png",
  };

  return `/logos/${map[symbol] ?? "default.png"}`;
};
