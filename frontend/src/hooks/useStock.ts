import {
  buying,
  selling,
  stockDetail,
  StockDetailProps,
  StockTradeProps,
} from "@/api/stock.api";
import { useAlert } from "./useAlert";
import { IStockDetail } from "@/models/stock/stock-detail";

export const useStock = () => {
  const { showAlert } = useAlert();

  const getStockDetail = async (data: StockDetailProps) => {
    try {
      const res: IStockDetail = await stockDetail(data);
      return res;
    } catch (error) {
      showAlert("주식 정보를 불러오는데 실패했습니다.");
    }
  };

  const buyStock = async (data: StockTradeProps) => {
    try {
      await buying(data);
      showAlert(`${data.quantity}주 구매에 성공했습니다.`);
    } catch (error) {
      showAlert("주식 구매에 실패하였습니다.");
    }
  };

  const sellStock = async (data: StockTradeProps) => {
    try {
      await selling(data);
      showAlert(`${data.quantity}주 판매에 성공했습니다.`);
    } catch (error) {
      showAlert("주식 판매에 실패하였습니다.");
    }
  };

  return {
    getStockDetail,
    buyStock,
    sellStock,
  };
};
