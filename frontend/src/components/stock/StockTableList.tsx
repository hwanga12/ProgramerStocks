import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { stocks } from "@/api/stock.api";
import { TStock } from "@/models/stock/stock";
import { getStockLogoUrl } from "@/util/stock/getStockLogo";

const StockListTable = () => {
  const navigate = useNavigate();
  const [stockList, setStockList] = useState<TStock[]>([]);

  useEffect(() => {
    const fetchStockList = async () => {
      setStockList(await stocks());
    };
    fetchStockList();
  }, []);

  return (
    <TableStyle>
      <thead>
        <tr>
          <th>종목</th>
          <th>현재가</th>
          <th>등락률</th>
        </tr>
      </thead>
      <tbody>
        {stockList.map((stock) => {
          const isUp = parseFloat(stock.change_rate) >= 0;
          const formattedRate = `${isUp ? "+" : ""}${stock.change_rate}%`;

          return (
            <tr
              key={stock.id}
              onClick={() => {
                navigate(`/stock/${stock.id}`);
              }}
            >
              <td className="name-cell">
                <img
                  src={getStockLogoUrl(stock.symbol)}
                  alt={stock.company_name}
                />
                <span>{stock.company_name}</span>
              </td>
              <td>${stock.current_price}</td>
              <td className={isUp ? "rise" : "fall"}>{formattedRate}</td>
            </tr>
          );
        })}
      </tbody>
    </TableStyle>
  );
};

const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    th {
      text-align: left;
      padding: 12px;
      font-size: 16px;
      color: ${({ theme }) => theme.color.subtext};
    }

    th:nth-child(1) {
      padding-left: 10px;
    }
    th:nth-child(2),
    th:nth-child(3) {
      text-align: right;
      padding-right: 50px;
    }
  }

  tbody {
    tr {
      cursor: pointer;
      &:nth-child(odd) {
        background-color: #efefef;
      }

      &:nth-child(even) {
        background-color: #ffffff;
      }
    }

    td {
      padding: 12px;
      font-size: 20px;
      color: ${({ theme }) => theme.color.text};
    }

    td:nth-child(2),
    td:nth-child(3) {
      text-align: right;
      padding-right: 40px;
    }

    .name-cell {
      display: flex;
      align-items: center;
      gap: 13px;

      img {
        width: 32px;
        height: 32px;
      }
    }

    .rise {
      color: ${({ theme }) => theme.color.rise};
    }

    .fall {
      color: ${({ theme }) => theme.color.fall};
    }
  }
`;

export default StockListTable;
