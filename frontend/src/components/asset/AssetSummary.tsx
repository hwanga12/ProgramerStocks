import React from "react";
import { Portfolio } from "@/types/asset.type";
import {
  formatCurrency,
  formatSignedCurrency,
  formatPercent,
} from "@/util/asset/formatter";
import {
  calculateTotalPrincipal,
  calculateTotalProfit,
  calculateTotalStockValuation,
} from "@/util/asset/calculate";
import styled from "styled-components";

interface AssetSummaryProps {
  portfolio: Portfolio;
}

const AssetSummary: React.FC<AssetSummaryProps> = ({ portfolio }) => {
  const { cash, totalAsset, stocks } = portfolio;

  const totalStockPrincipal = calculateTotalPrincipal(stocks);
  const totalValuation = calculateTotalStockValuation(portfolio.stocks);
  const totalPrincipal = cash + totalStockPrincipal;
  const totalProfit = calculateTotalProfit(stocks);
  const totalProfitRate = totalPrincipal
    ? (totalProfit / totalPrincipal) * 100
    : 0;

  const profitClass = totalProfit > 0 ? "plus" : totalProfit < 0 ? "minus" : "";

  return (
    <AssetSummaryStyle>
      <div>
        <p className="title">내 투자</p>
        <h3>{formatCurrency(totalAsset)}</h3>
      </div>
      <div className="row">
        <div className="block">
          <span className="label">원금</span>
          <span className="value">{formatCurrency(totalPrincipal)}</span>
        </div>
        <div className="block">
          <span className="label">총 수익</span>
          <span className={`value ${profitClass}`}>
            {formatSignedCurrency(totalProfit)}
            <span className="rate">({totalProfitRate.toFixed(2)}%)</span>
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-left">
          <span className="label">해외주식</span>
          <span>{formatCurrency(totalValuation)}</span>
        </div>
        {/* <div className={`bottom-right ${profitClass}`}>
          <span>{formatSignedCurrency(totalProfit)}</span>
          <span>({formatPercent(totalProfitRate)})</span>
        </div> */}
      </div>
    </AssetSummaryStyle>
  );
};

const AssetSummaryStyle = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
  gap: 12px;

  .title {
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.color.subtext};
  }

  h3 {
    font-size: 24px;
    font-weight: bold;
    margin: 4px 0 12px 0;
    color: #222;
  }

  .row {
    display: flex;
    gap: 24px;
    color: ${({ theme }) => theme.color.subtext};
  }

  .block {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .value {
    font-weight: 500;
  }

  .plus {
    color: ${({ theme }) => theme.color.rise};
  }

  .minus {
    color: ${({ theme }) => theme.color.fall};
  }

  .rate {
    margin-left: 4px;
  }

  .bottom {
    display: flex;
    gap: 24px;
    margin-top: 30px;
    font-size: 16px;
  }

  .bottom-left {
    display: flex;
    color: #333d4b;
    font-weight: bold;
    gap: 8px;
  }

  .bottom-right {
    display: flex;
    gap: 4px;
    font-weight: 500;
  }
`;

export default AssetSummary;
