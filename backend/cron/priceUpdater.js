const cron = require("node-cron");
const axios = require("axios");
const db = require("../db");
const moment = require("moment-timezone");
require("dotenv").config();

const fetchPrice = async (symbol) => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.API_KEY}`;
  const res = await axios.get(url);
  return parseFloat(res.data["Global Quote"]["05. price"]);
};

// 한국 시간 기준 밤 11시, 1시, 3시, 5시에 실행
cron.schedule("0 14,16,18,20 * * *", async () => {
  console.log("Fetching stock prices... (한국 시간 기준)");
  const [stocks] = await db.query("SELECT id, symbol FROM stocks");

  for (const stock of stocks) {
    try {
      const price = await fetchPrice(stock.symbol);
      const nowInSeoul = moment()
        .tz("Asia/Seoul")
        .format("YYYY-MM-DD HH:mm:ss");

      await db.query(
        `
        INSERT INTO stock_prices (stock_id, price, fetched_at)
        VALUES (?, ?, ?)
        `,
        [stock.id, price, nowInSeoul]
      );

      console.log(
        `✔️ ${stock.symbol} 가격 저장 (KST): ${price} @ ${nowInSeoul}`
      );
    } catch (err) {
      console.error(`❌ ${stock.symbol} 가격 저장 실패`, err.message);
    }
  }
});
