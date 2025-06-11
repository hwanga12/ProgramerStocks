import styled from "styled-components";
import { format, isValid } from "date-fns";
import { useTransactionStore } from "../../store/transactionStore";
import { useEffect } from "react";
import { useAssetStore } from "@/store/assetStore";

const TransactionList = () => {
  const {
    transactions,
    fetchTransactions,
    selectedTransactionId,
    selectTransaction,
  } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionListStyle>
      {transactions
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((tx) => {
          const dateObj = new Date(tx.created_at);
          if (!isValid(dateObj)) return null;

          const date = format(dateObj, "M.d");
          const time = format(dateObj, "HH:mm");
          const isBuy = tx.type === "buy";
          const signedPrice = `${
            isBuy ? "-" : "+"
          }$${tx.total_price.toLocaleString()}`;

          return (
            <li
              key={tx.id}
              onClick={() =>
                selectedTransactionId === tx.id
                  ? selectTransaction(null)
                  : selectTransaction(tx.id)
              }
              className={selectedTransactionId === tx.id ? "active" : ""}
            >
              <div className="row">
                <div className="left">
                  <div className="top">
                    <span className="date">{date}</span>
                    <span className="stock">
                      {tx.symbol} {tx.quantity}주
                    </span>
                  </div>
                  <div className="bottom">
                    <span className="time">{time}</span>
                    <span className="line">|</span>
                    <span className="type">{isBuy ? "구매" : "판매"}</span>
                  </div>
                </div>
                <div className="right">
                  <span className={`price ${isBuy ? "buy" : "sell"}`}>
                    {signedPrice}
                  </span>
                  <span className="balance">
                    ${tx.cash_after.toLocaleString()}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
    </TransactionListStyle>
  );
};

const TransactionListStyle = styled.ul`
  list-style: none;
  padding: 0 10px;
  width: 100%;

  li {
    border-bottom: 0.7px solid ${({ theme }) => theme.color.border};
    padding: 10px 0;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover,
    &.active {
      background-color: ${({ theme }) => theme.color.hover};
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .left {
      display: flex;
      flex-direction: column;

      .top {
        display: flex;
        gap: 12px;
        font-weight: 500;

        .date {
          width: 37px;
          text-align: left;
          margin-left: 10px;
          color: ${({ theme }) => theme.color.subtext};
        }

        .stock {
          font-weight: 500;
        }
      }

      .bottom {
        display: flex;
        gap: 5px;
        font-size: 14px;
        color: ${({ theme }) => theme.color.subtext};
        margin-top: 4px;
        margin-left: 59px;

        .time {
          width: 39px;
        }

        .line {
          padding: 0 2px 0 0;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 10px;

      .price {
        font-weight: bold;
      }

      /* .price.buy {
        color: ${({ theme }) => theme.color.rise};
      }

      .price.sell {
        color: ${({ theme }) => theme.color.fall};
      } */

      .balance {
        font-size: 14px;
        color: ${({ theme }) => theme.color.subtext};
        margin-top: 4px;
      }
    }
  }
`;

export default TransactionList;
