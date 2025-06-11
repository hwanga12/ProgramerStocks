import styled from "styled-components";
import { useTransactionStore } from "../../store/transactionStore";
import { format } from "date-fns";
import { getStockLogoUrl } from "@/util/stock/getStockLogo";

const TransactionDetail = () => {
  const { selectedTransactionId, transactions } = useTransactionStore();
  const transaction = transactions.find((t) => t.id === selectedTransactionId);

  if (transactions.length === 0) {
    return <DetailStyle>불러오는 중...</DetailStyle>;
  }

  if (!transaction) {
    return <DetailStyle>거래를 선택해주세요.</DetailStyle>;
  }

  const isBuy = transaction.type === "buy";
  const dateObj = new Date(transaction.created_at);
  const totalPrice = transaction.total_price;
  const signedPrice = `${isBuy ? "-" : "+"}$${totalPrice.toLocaleString()}`;

  return (
    <DetailStyle>
      <div className="header">
        <div className="left">
          <p>{transaction.symbol}</p>
          <h3>{signedPrice}</h3>
        </div>
        <div className="right">
          <img
            src={getStockLogoUrl(transaction.symbol)}
            alt={transaction.symbol}
          />
        </div>
      </div>

      <div className="info-table">
        <div className="row">
          <span className="label">거래 유형</span>
          <span className="value">{isBuy ? "주식 구매" : "주식 판매"}</span>
        </div>
        <div className="row">
          <span className="label">거래일</span>
          <span className="value">{format(dateObj, "yyyy년 M월 d일")}</span>
        </div>
        <div className="row">
          <span className="label">총 구매수량</span>
          <span className="value">{transaction.quantity}주</span>
        </div>
        <div className="row">
          <span className="label">총 구매금액</span>
          <span className="value">${totalPrice.toLocaleString()}</span>
        </div>
      </div>
    </DetailStyle>
  );
};

const DetailStyle = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    /*background-color: #ff0000;*/

    .left {
      display: flex;
      flex-direction: column;
      gap: 4px;

      p {
        font-size: 12px;
        color: ${({ theme }) => theme.color.subtext};
        margin: 0;
        line-height: 1.2;
      }

      h3 {
        font-size: 16px;
        color: ${({ theme }) => theme.color.text};
        margin: 0;
        line-height: 1.2;
      }
    }

    .right {
      img {
        width: 40px;
        height: 40px;
        object-fit: contain;
      }
    }
  }

  .info-table {
    padding: 5px 20px;
    /*background-color : #168BFF;*/

    .row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;

      .label {
        color: ${({ theme }) => theme.color.subtext};
        font-size: 12px;
      }

      .value {
        color: ${({ theme }) => theme.color.text};
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
`;

export default TransactionDetail;
