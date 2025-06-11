import { requestHandler } from "./http";

export interface StockDetailProps {
  id: number;
}

export interface StockTradeProps {
  stock_id: number;
  quantity: number;
}

export const stocks = () => {
  return requestHandler("get", "/stocks");
};

export const stockDetail = (data: StockDetailProps) => {
  return requestHandler("get", `/stocks/${data.id}`);
};

export const buying = (data: StockTradeProps) => {
  return requestHandler("post", "/transactions/buy", data);
};

export const selling = (data: StockTradeProps) => {
  return requestHandler("post", "/transactions/sell", data);
};

// Alpha Vantage에 직접 요청하는 api(사용 안함)
// type StockTime = "hour" | "day" | "week" | "month";
// enum StockTimeUrl {
//   hour = "TIME_SERIES_INTRADAY",
//   day = "TIME_SERIES_DAILY",
//   week = "TIME_SERIES_WEEKLY",
//   month = "TIME_SERIES_MONTHLY",
// }

// `interface StockDetailProps {
//   stockTime: StockTime;
//   symbol: string;
// }

// const stockRequestHandler = async (stockProps: StockDetailProps) => {
//   const BASE_URL = process.env.REACT_APP_STOCK_API_URL;
//   const KEY = process.env.REACT_APP_STOCK_API_KEY;

//   let response;

//   let params: Record<string, string> = {
//     function: StockTimeUrl[stockProps.stockTime],
//     symbol: stockProps.symbol,
//     apikey: KEY!,
//   };

//   if (stockProps.stockTime === "hour") {
//     params["interval"] = "60min";
//   }

//   const url = `${BASE_URL}/query`;
//   response = await axios.get(url, {
//     params: params,
//   });

//   return response.data;
// };

// export const stockPrice = (symbol: string, stockTime: StockTime) => {
//   return stockRequestHandler({ symbol: symbol, stockTime: stockTime });
// };
