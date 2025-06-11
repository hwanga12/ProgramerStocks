import { IPriceData } from "@/models/stock/stock-price";
import React, { useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// 월 중복 제거용 formatter 생성 함수
const createMonthTickFormatter = (): ((tick: string) => string) => {
  let lastMonth: number | null = null;
  return (tick: string) => {
    const date = new Date(tick);
    const month = date.getMonth() + 1; // 0부터 시작이므로 +1
    if (month !== lastMonth) {
      lastMonth = month;
      return `${month}월`;
    }
    return "";
  };
};

const createDayTickFormatter = (): ((tick: string) => string) => {
  let lastMonth: number | null = null;
  let lastDay: number | null = null;
  return (tick: string) => {
    const date = new Date(tick);
    let month = date.getMonth() + 1;
    let day = date.getDate(); // 1 ~ 31

    if (month !== lastMonth) {
      lastMonth = month;
      return `${month}월`;
    }
    if (day !== lastDay) {
      lastDay = day;
      return `${day}일`;
    }
    return "";
  };
};

type RenderLineChartProps = {
  data: IPriceData[];
  selectedChartType: String;
};

export const RenderLineChart: React.FC<RenderLineChartProps> = ({
  data,
  selectedChartType,
}) => {
  const tickFormatter =
    selectedChartType === "일"
      ? createMonthTickFormatter()
      : createDayTickFormatter();

  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // padding으로 상, 하 여유 조정
  const padding = (maxPrice - minPrice) * 0.1;
  const domain: [number, number] = [
    Math.floor(minPrice - padding),
    Math.ceil(maxPrice + padding),
  ];

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth;
    }
  }, [selectedChartType]);

  return (
    <div style={{ display: "flex", marginLeft: "-20px" }}>
      {/* y축만 렌더링 */}
      <div style={{}}>
        <LineChart
          width={61}
          height={300}
          margin={{ top: 0, right: 0, bottom: 5, left: 0 }}
        >
          <XAxis width={30} />
          <YAxis domain={domain} />
        </LineChart>
      </div>

      {/* x축과 스크롤 가능한 그래프 렌더링*/}
      <div
        ref={scrollContainerRef}
        style={{ overflowX: "auto", width: "550px" }}
      >
        <LineChart
          key={`${selectedChartType}`}
          width={Math.max(data.length * 30, 550)}
          height={300}
          data={data}
          margin={{ top: 0, right: 10, bottom: 5, left: 20 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="name"
            tickFormatter={tickFormatter}
            tick={{ fontSize: 15 }}
            tickLine={false}
            // axisLine={false}
          />
          <Tooltip />
          <YAxis domain={domain} hide={true} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            // animationDuration={1000}
          />
        </LineChart>
      </div>
    </div>
  );
};
