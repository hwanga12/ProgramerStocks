const db = require("../db");

exports.getMyAssets = async (req, res) => {
  const user_id = req.user.id;
  try {
    // 현금 조회
    const [cashResult] = await db.query(
      "SELECT cash FROM assets WHERE user_id = ?",
      [user_id]
    );
    const cash = cashResult.length > 0 ? cashResult[0].cash : 0;

    // 주식 보유 정보와 평가액 계산
    const [holdings] = await db.query(
      `
      SELECT 
        s.symbol,
        sa.quantity,
        sa.average_price,
        sp.price AS current_price
      FROM stockAssets sa
      JOIN stocks s ON sa.stock_id = s.id
      JOIN (
        SELECT stock_id, MAX(fetched_at) as latest_time
        FROM stock_prices
        GROUP BY stock_id
      ) latest ON sa.stock_id = latest.stock_id
      JOIN stock_prices sp ON sp.stock_id = latest.stock_id AND sp.fetched_at = latest.latest_time
      WHERE sa.user_id = ?
    `,
      [user_id]
    );

    // 총 평가액 계산
    let totalValuation = 0;
    const enrichedHoldings = holdings.map((h) => {
      const valuation = h.quantity * h.current_price;
      const profit = valuation - h.quantity * h.average_price;
      totalValuation += valuation;
      return {
        symbol: h.symbol,
        quantity: h.quantity,
        average_price: h.average_price,
        current_price: parseFloat(h.current_price.toFixed(2)),
        valuation: parseFloat(valuation.toFixed(2)),
        profit: parseFloat(profit.toFixed(2)),
      };
    });

    res.status(200).json({
      cash,
      totalAsset: Math.round(cash + totalValuation),
      stocks: enrichedHoldings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
};

exports.updateCash = async (req, res) => {
  const user_id = req.user.id;
  const { cash } = req.body;

  if (cash === undefined || isNaN(cash)) {
    return res.status(400).json({ error: "cash는 숫자여야 합니다" });
  }

  try {
    const [existing] = await db.query(
      "SELECT id FROM assets WHERE user_id = ?",
      [user_id]
    );

    if (existing.length === 0) {
      // 새로 추가
      await db.query(
        "INSERT INTO assets (user_id, cash, created_at) VALUES (?, ?, NOW())",
        [user_id, cash]
      );
    } else {
      // 기존 현금 업데이트
      await db.query("UPDATE assets SET cash = cash + ? WHERE user_id = ?", [
        cash,
        user_id,
      ]);
    }

    const [rows] = await db.query("SELECT cash FROM assets WHERE user_id = ?", [
      user_id,
    ]);
    const currentCash = rows.length > 0 ? rows[0].cash : 0;

    res.status(200).json({ message: "캐쉬 추가 완료", cash: currentCash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
};
