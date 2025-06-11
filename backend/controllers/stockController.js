const db = require("../db");

function calculateChangeRate(prevPrice, currPrice) {
  if (!prevPrice || !currPrice || prevPrice === 0) return null;
  const change = ((currPrice - prevPrice) / prevPrice) * 100;
  return parseFloat(change.toFixed(1));
}

exports.getStockList = async (req, res) => {
  try {
    const [stocks] = await db.query(`
      SELECT s.id, s.symbol, s.company_name, sp.price AS current_price
      FROM stocks s
      LEFT JOIN (
        SELECT stock_id, price
        FROM stock_prices
        WHERE (stock_id, fetched_at) IN (
          SELECT stock_id, MAX(fetched_at)
          FROM stock_prices
          GROUP BY stock_id
        )
      ) sp ON s.id = sp.stock_id;
    `);

    for (const stock of stocks) {
      const stockId = stock.id;

      // 어제 종가 (daily_stock_prices)
      const [yesterdayResult] = await db.query(
        `SELECT close FROM daily_stock_prices 
         WHERE stock_id = ? AND price_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY) LIMIT 1`,
        [stockId]
      );

      // 오늘 최신 시간별 가격 (stock_prices)
      const [latestTodayResult] = await db.query(
        `SELECT price FROM stock_prices 
         WHERE stock_id = ? AND DATE(fetched_at) = CURDATE() 
         ORDER BY fetched_at DESC LIMIT 1`,
        [stockId]
      );

      stock.change_rate = calculateChangeRate(
        yesterdayResult[0]?.close,
        latestTodayResult[0]?.price
      );
    }

    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
};

exports.getStockDetail = async (req, res) => {
  const stockId = req.params.id;

  try {
    const [stockRows] = await db.query(
      `SELECT s.*, sp.price AS current_price
       FROM stocks s
       LEFT JOIN (
         SELECT stock_id, price
         FROM stock_prices
         WHERE stock_id = ? ORDER BY fetched_at DESC LIMIT 1
       ) sp ON s.id = sp.stock_id
       WHERE s.id = ?`,
      [stockId, stockId]
    );

    if (stockRows.length === 0)
      return res.status(404).json({ message: "Not found" });

    const stock = stockRows[0];

    // 어제 종가 (daily_stock_prices)
    const [yesterdayResult] = await db.query(
      `SELECT close FROM daily_stock_prices 
       WHERE stock_id = ? AND price_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY) LIMIT 1`,
      [stockId]
    );

    // 오늘 최신 시간별 가격 (stock_prices)
    const [latestTodayResult] = await db.query(
      `SELECT price FROM stock_prices 
       WHERE stock_id = ? AND DATE(fetched_at) = CURDATE()
       ORDER BY fetched_at DESC LIMIT 1`,
      [stockId]
    );

    stock.change_rate = calculateChangeRate(
      yesterdayResult[0]?.close,
      latestTodayResult[0]?.price
    );

    // 일별 가격 전체
    const [dailyPrices] = await db.query(
      `SELECT price_date, close FROM daily_stock_prices WHERE stock_id = ? ORDER BY price_date ASC`,
      [stockId]
    );

    // 시간별 가격 전체
    const [timePrices] = await db.query(
      `SELECT fetched_at, price FROM stock_prices WHERE stock_id = ? ORDER BY fetched_at ASC`,
      [stockId]
    );

    res.json({
      ...stock,
      daily_prices: dailyPrices,
      time_prices: timePrices,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
};
