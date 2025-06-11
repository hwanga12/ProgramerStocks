import styled from "styled-components";
import { Button, Segmented } from "antd";
import { useState } from "react";
import { useTheme } from "styled-components";
import { useStock } from "@/hooks/useStock";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { StockTradeProps } from "@/api/stock.api";

interface StockTradeDivProps {
  stockId: number;
  curPrice: string;
}

const StockTradeDiv = ({ stockId, curPrice }: StockTradeDivProps) => {
  const { buyStock, sellStock } = useStock();
  const tradeType: string[] = ["매수", "매도"];
  const tradeButton: string[] = ["구매하기", "판매하기"];
  const [selected, setSelected] = useState<string>("매수");
  const [stockAmount, setStockAmount] = useState<number>(0);

  const plusStockAmount = () => {
    setStockAmount(stockAmount + 1);
  };

  const minusStockAMount = () => {
    if (stockAmount <= 1 || stockAmount === null) {
      return;
    } else {
      setStockAmount(stockAmount - 1);
    }
  };

  const theme = useTheme();

  return (
    <StockTradeDivStyle $selected={selected}>
      <Segmented<string>
        className="segmented"
        options={tradeType}
        onChange={(value) => {
          setSelected(value);
          setStockAmount(0);
        }}
        block
      />
      <div className="price">
        <div className="trade-subtitle">구매 가격</div>
        <div className="box">${curPrice}</div>
      </div>
      <div className="amount">
        <div className="trade-subtitle">수량</div>
        <div className="box">
          <div className="input">
            <input
              placeholder="수량 입력"
              value={stockAmount === 0 ? "" : stockAmount.toLocaleString()}
              onChange={(e) => {
                const rawValue = e.target.value.replaceAll(",", ""); // 콤마 제거
                if (/^\d*$/.test(rawValue)) {
                  const numberValue = Number(rawValue);
                  if (numberValue <= 1000000) {
                    setStockAmount(numberValue);
                  }
                }
              }}
            />
          </div>
          <div className="amount-buttons">
            <button onClick={() => minusStockAMount()}>
              <FaMinus />
            </button>
            <button onClick={() => plusStockAmount()}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
      <Button
        className="trade-button"
        type="primary"
        style={{
          width: "100%",
          backgroundColor:
            selected === "매수" ? theme.color.rise : theme.color.fall,
        }}
        onClick={() => {
          const props: StockTradeProps = {
            stock_id: stockId,
            quantity: stockAmount,
          };
          selected === "매수" ? buyStock(props) : sellStock(props);
        }}
      >
        {selected === "매수" ? tradeButton[0] : tradeButton[1]}
      </Button>
    </StockTradeDivStyle>
  );
};

const StockTradeDivStyle = styled.div<{ $selected: string }>`
  width: 270px;
  .segmented {
    margin-bottom: 20px;
    .ant-segmented-item {
      transition: none;
      align-items: center;
    }
    .ant-segmented-item-selected {
      color: ${({ $selected, theme }) =>
        $selected === "매수" ? theme.color.rise : theme.color.fall};
      font-weight: 600;
      align-items: center;
    }
  }

  .price,
  .amount {
    padding: 0;
    display: flex;
    align-items: center;
    margin: 15px 0;

    .trade-subtitle {
      width: 60px;
      font-weight: 600;
      margin: 0;
    }
    .box {
      display: flex;
      justify-content: space-between;
      flex: 1;
      margin-left: 20px;
      border: ${({ theme }) => `solid 1px ${theme.color.border}`};
      border-radius: 8px;
      padding: 3px 3px 3px 10px;
      .input {
        display: flex;
        flex: 1;
        input {
          font-size: 16px;
          border: none;
          width: 100%;
          outline: none;
          padding: 0;
        }
      }

      .amount-buttons {
        display: flex;
        button {
          border: none;
          background-color: transparent;
          font-size: 14px;
          font-weight: 600;
          color: ${({ theme }) => theme.color.secondary};
          padding: 2px 3px;
          cursor: pointer;

          &:hover {
            background-color: ${({ theme }) => theme.color.background};
            border-radius: 4px;
          }
        }
      }
    }
  }
`;

export default StockTradeDiv;
