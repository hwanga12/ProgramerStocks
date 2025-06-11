const cron = require("node-cron");
const axios = require("axios");
const db = require("../db");
const moment = require("moment-timezone");
require("dotenv").config();

const fetchDailyPrices = async (symbol) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.API_KEY}`;
  const res = await axios.get(url);
  // "Time Series (Daily)" 객체 반환
  return res.data["Time Series (Daily)"];
};

cron.schedule("0 0 * * *", async () => {
  // 매일 9:00 (KST) 실행
  console.log("Fetching daily prices... (KST 9:00)");

  try {
    const [stocks] = await db.query("SELECT id, symbol FROM stocks");

    for (const stock of stocks) {
      try {
        const dailyData = await fetchDailyPrices(stock.symbol);

        if (!dailyData) {
          console.error(`데일리 데이터 없음: ${stock.symbol}`);
          continue;
        }

        for (const dateStr of Object.keys(dailyData)) {
          const dayData = dailyData[dateStr];

          const open = parseFloat(dayData["1. open"]);
          const high = parseFloat(dayData["2. high"]);
          const low = parseFloat(dayData["3. low"]);
          const close = parseFloat(dayData["4. close"]);
          // 알파밴티지 API가 volume을 '6. volume' 또는 '5. volume' 키 중 하나로 줌
          const volume = parseInt(
            dayData["6. volume"] || dayData["5. volume"],
            10
          );

          await db.query(
            `
            INSERT INTO daily_stock_prices (stock_id, price_date, open, high, low, close, volume)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              open = VALUES(open),
              high = VALUES(high),
              low = VALUES(low),
              close = VALUES(close),
              volume = VALUES(volume)
          `,
            [stock.id, dateStr, open, high, low, close, volume]
          );
        }

        console.log(`✔️ ${stock.symbol} 데일리 가격 저장 완료`);
      } catch (err) {
        console.error(`❌ ${stock.symbol} 데일리 가격 저장 실패`, err.message);
      }
    }
  } catch (err) {
    console.error("주식 목록 조회 실패", err.message);
  }
});
