import styled from "styled-components";
import { useParams } from "react-router-dom";
import StockBuyingSelling from "@/components/stock/StockTrade";
import { useEffect, useState } from "react";
import { RenderLineChart } from "@/components/stock/StockGraph";
import { Segmented } from "antd";
import { capitalizeFirstLetter } from "@/util/capitalize";
import { IStockDetail } from "@/models/stock/stock-detail";
import { StockDetailProps } from "@/api/stock.api";
import { IPriceData } from "@/models/stock/stock-price";
import { parseStockPrices } from "@/util/stock/parseStockData";
import { useStock } from "@/hooks/useStock";
import { getStockLogoUrl } from "@/util/stock/getStockLogo";

const StockDetail: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  const { getStockDetail } = useStock();
  const stockIdNum = Number(stockId);

  const chartType: string[] = ["일", "실시간"];
  const [selectedChartType, setSelectedChartType] = useState<string>(
    chartType[0]
  );

  const [stockDetail, setStockDetail] = useState<IStockDetail | null>(null);
  const [stockPriceList, setStockPriceList] = useState<IPriceData[][]>([]);

  useEffect(() => {
    const fetchStockDetail = async () => {
      const stockDetailProps: StockDetailProps = {
        id: stockIdNum,
      };
      const stockDetail = await getStockDetail(stockDetailProps);

      if (stockDetail) {
        setStockDetail(stockDetail);
        setStockPriceList(parseStockPrices(stockDetail));
      } else {
        setStockDetail(null);
      }
    };
    fetchStockDetail();
  }, [getStockDetail, stockIdNum]);

  const getStockData = () => {
    if (selectedChartType === chartType[0]) {
      return stockPriceList[0];
    } else {
      return stockPriceList[1];
    }
  };

  if (!stockDetail) {
    return null;
  }

  return (
    <StockStyle>
      <div className="stock-info-container">
        <img
          className="stock-info-image"
          src={getStockLogoUrl(stockDetail.symbol)}
          alt={stockDetail.company_name}
          width="60px"
          height="60px"
        />
        <div className="stock-info-name-price">
          <div className="stock-info-name">
            <span>{capitalizeFirstLetter(stockDetail.company_name)}</span>
            <span className="symbol">{stockDetail.symbol}</span>
          </div>
          <div className="stock-info-price">${stockDetail.current_price}</div>
        </div>
      </div>

      <div className="container">
        <div className="chart">
          <div className="stock-subtitle">차트</div>
          <Segmented<string>
            className="segmented"
            options={chartType}
            onChange={(value) => {
              setSelectedChartType(value);
            }}
          />
          {stockPriceList[0] && stockPriceList[1] && (
            <RenderLineChart
              data={getStockData()}
              selectedChartType={selectedChartType}
            />
          )}
        </div>
        <div className="trade">
          <div className="stock-subtitle">매매</div>
          <StockBuyingSelling
            stockId={stockDetail.id}
            curPrice={stockDetail.current_price}
          />
        </div>
      </div>
    </StockStyle>
  );
};

const StockStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .stock-info-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 15px;

    .stock-info-name-price {
      display: flex;
      flex-direction: column;
      .stock-info-name {
        display: flex;
        gap: 10px;
        font-size: 21px;
        font-weight: 600;
        .symbol {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
      .stock-info-price {
        font-size: 25px;
        font-weight: 700;
      }
    }
  }

  .container {
    display: flex;
    gap: 50px;
  }

  .stock-subtitle {
    font-size: 20px;
    font-weight: 600;
  }

  .chart {
    width: 600px;
    .segmented {
      width: fit-content;

      .ant-segmented-item-selected {
        font-weight: 500;
        align-items: center;
      }
    }
  }

  .chart,
  .trade {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export default StockDetail;
