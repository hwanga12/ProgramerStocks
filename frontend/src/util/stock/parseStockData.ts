import { IStockDetail } from "@/models/stock/stock-detail";
import { IPriceData } from "@/models/stock/stock-price";

export const parseStockPrices = (data: IStockDetail) => {
  const stockDailyPrices: IPriceData[] = data.daily_prices.map((item) => ({
    name: item.price_date.substring(0, 10),
    price: item.close,
  }));
  const stockTimePrices: IPriceData[] = data.time_prices.map((item) => ({
    name:
      item.fetched_at.substring(0, 10) +
      " " +
      item.fetched_at.substring(11, 19),
    price: item.price,
  }));
  return [stockDailyPrices, stockTimePrices];
};

// type DailyStockData = {
//   "Meta Data": {
//     "1. Information": string;
//     "2. Symbol": string;
//     "3. Last Refreshed": string;
//     "4. Output Size": string;
//     "5. Time Zone": string;
//   };
//   "Time Series (Daily)": {
//     [date: string]: TimeSeriesEntry;
//   };
// };

// type IntradayStockData = {
//   "Meta Data": {
//     "1. Information": string;
//     "2. Symbol": string;
//     "3. Last Refreshed": string;
//     "4. Interval": string;
//     "5. Output Size": string;
//     "6. Time Zone": string;
//   };
//   "Time Series (60min)": {
//     [date: string]: TimeSeriesEntry;
//   };
// };

// type TimeSeriesEntry = {
//   "1. open": string;
//   "2. high": string;
//   "3. low": string;
//   "4. close": string;
//   "5. volume": string;
// };

// export type PriceData = {
//   name: string;
//   price: number;
// };

// export const parseDailyStockData = (data: DailyStockData) => {
//   const timeSeries = data["Time Series (Daily)"];
//   let rtnData: PriceData[] = Object.entries(timeSeries).map(
//     ([date, values]) => ({
//       name: date,
//       price: parseFloat(values["4. close"]),
//     })
//   );
//   rtnData = rtnData.reverse();

//   return rtnData;
// };

// export const parseIntradayStockData = (data: IntradayStockData) => {
//   const timeSeries = data["Time Series (60min)"];
//   let rtnData: PriceData[] = Object.entries(timeSeries).map(
//     ([date, values]) => ({
//       name: date,
//       price: parseFloat(values["4. close"]),
//     })
//   );
//   rtnData = rtnData.reverse();

//   return rtnData;
// };
