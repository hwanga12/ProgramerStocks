import React from "react";
import { Portfolio } from "@/types/asset.type";
import {
  formatCurrency,
  formatSignedCurrency,
  formatPercent,
} from "../../util/asset/formatter";
import { sortStocks } from "@/util/asset/sort";
import { SortKey, useSortStore } from "@/store/sortStore";

import styled from "styled-components";
import {
  calculatePrincipal,
  calculateProfitRate,
  calculateValuation,
} from "@/util/asset/calculate";

interface AssetListProps {
  portfolio: Portfolio;
}

const AssetList: React.FC<AssetListProps> = ({ portfolio }) => {
  const { sortKey, sortOrder, setSortKey } = useSortStore();

  const sortedStocks = sortStocks(portfolio.stocks, sortKey, sortOrder);

  const headers: { label: string; key: SortKey }[] = [
    { label: "종목명", key: "symbol" },
    { label: "총 수익률", key: "profitRate" },
    { label: "총 수익금", key: "profit" },
    { label: "1주 평균금액", key: "average_price" },
    { label: "현재가", key: "valuation" },
    { label: "보유 수량", key: "quantity" },
    { label: "평가금", key: "valuationTotal" },
    { label: "원금", key: "principal" },
  ];

  const getArrow = (key: SortKey) => {
    if (key !== sortKey) return "\u2195";
    return sortOrder === "asc" ? "\u25B2" : "\u25BC";
  };

  return (
    <AssetListStyle>
      <table>
        <thead className="col">
          <tr>
            {headers.map(({ label, key }) => (
              <th
                key={key}
                onClick={() => setSortKey(key)}
                className={sortKey === key ? "active" : ""}
              >
                {label} {getArrow(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock) => {
            const principal = calculatePrincipal(stock);
            const valuation = calculateValuation(stock);
            const profitRate = calculateProfitRate(stock);
            const isProfit = stock.profit < 0 ? "fall" : "rise";

            return (
              <tr key={stock.symbol}>
                {/* 여기 로고 및 이름으로 변경*/}
                <td>{stock.symbol}</td>
                <td className={isProfit}>{formatPercent(profitRate)}</td>
                <td className={isProfit}>
                  {formatSignedCurrency(stock.profit)}
                </td>
                <td>{formatCurrency(stock.average_price)}</td>
                <td>{formatCurrency(stock.current_price)}</td>
                <td>{stock.quantity}주</td>
                <td>{formatCurrency(valuation)}</td>
                <td>{formatCurrency(principal)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AssetListStyle>
  );
};

const AssetListStyle = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 8px 16px;
    font-size: 14px;
    text-align: right;
  }

  th {
    color: ${({ theme }) => theme.color.subtext};
    font-size: 13px;
    cursor: pointer;
  }

  td {
    color: #303030;

    &.rise {
      color: ${({ theme }) => theme.color.rise};
    }

    &.fall {
      color: ${({ theme }) => theme.color.fall};
    }
  }

  th:first-child,
  td:first-child {
    text-align: left;
    padding-right: 40px;
  }

  th.active {
    color: #2272eb;
    font-weight: 600;
  }
`;

export default AssetList;
