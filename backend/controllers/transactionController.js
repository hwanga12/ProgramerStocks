const db = require("../db");

exports.buyStock = async (req, res) => {
  const user_id = req.user.id;
  const { stock_id, quantity } = req.body;

  if (!stock_id || !quantity || isNaN(stock_id) || isNaN(quantity)) {
    return res
      .status(400)
      .json({ error: "stock_id와 quantity는 숫자로 필수입니다" });
  }

  try {
    // 최신 주가 가져오기
    const [priceResult] = await db.query(
      "SELECT price FROM stock_prices WHERE stock_id = ? ORDER BY fetched_at DESC LIMIT 1",
      [stock_id]
    );
    if (priceResult.length === 0) {
      return res
        .status(400)
        .json({ error: "해당 주식의 가격 정보가 없습니다" });
    }
    const price = priceResult[0].price;
    const totalPrice = price * quantity;

    // 사용자의 현재 보유 현금 확인
    const [assetResult] = await db.query(
      "SELECT cash FROM assets WHERE user_id = ?",
      [user_id]
    );
    if (assetResult.length === 0 || assetResult[0].cash < totalPrice) {
      return res.status(400).json({ error: "잔액이 부족합니다" });
    }

    // 현금 차감
    await db.query("UPDATE assets SET cash = cash - ? WHERE user_id = ?", [
      totalPrice,
      user_id,
    ]);

    //현재 현금 잔액 조회
    const [currentCash] = await db.query([user_id]);
    const cashAfter = currentCash[0].cash;

    // stockAssets 테이블에 주식 보유량 추가 또는 갱신
    const [existing] = await db.query(
      "SELECT quantity, average_price FROM stockAssets WHERE user_id = ? AND stock_id = ?",
      [user_id, stock_id]
    );

    if (existing.length === 0) {
      // 새로 추가
      await db.query(
        "INSERT INTO stockAssets (user_id, stock_id, quantity, average_price, created_at) VALUES (?, ?, ?, ?, NOW())",
        [user_id, stock_id, quantity, price]
      );
    } else {
      // 기존 평균단가 재계산
      const prevQty = existing[0].quantity;
      const prevAvg = existing[0].average_price;
      const newQty = prevQty + quantity;
      const newAvg = parseFloat(
        ((prevQty * prevAvg + quantity * price) / newQty).toFixed(2)
      );

      await db.query(
        "UPDATE stockAssets SET quantity = ?, average_price = ? WHERE user_id = ? AND stock_id = ?",
        [newQty, newAvg, user_id, stock_id]
      );
    }

    // 거래 기록
    await db.query(
      "INSERT INTO transactions (type, user_id, stock_id, quantity, total_price, cash_after, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      ["buy", user_id, stock_id, quantity, totalPrice, cashAfter]
    );

    res.json({ message: "매수 성공", total_price: totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
};

exports.sellStock = async (req, res) => {
  const user_id = req.user.id;
  const { stock_id, quantity } = req.body;

  if (!stock_id || !quantity || isNaN(stock_id) || isNaN(quantity)) {
    return res
      .status(400)
      .json({ error: "stock_id와 quantity는 숫자로 필수입니다" });
  }

  try {
    // stockAssets에서 해당 주식의 보유 수량 확인
    const [holding] = await db.query(
      "SELECT quantity, average_price FROM stockAssets WHERE user_id = ? AND stock_id = ?",
      [user_id, stock_id]
    );

    if (holding.length === 0 || holding[0].quantity < quantity) {
      return res.status(400).json({ error: "보유 주식 수량이 부족합니다" });
    }

    // 최신 주가 가져오기
    const [priceResult] = await db.query(
      "SELECT price FROM stock_prices WHERE stock_id = ? ORDER BY fetched_at DESC LIMIT 1",
      [stock_id]
    );
    if (priceResult.length === 0) {
      return res
        .status(400)
        .json({ error: "해당 주식의 가격 정보가 없습니다" });
    }

    const price = priceResult[0].price;
    const totalPrice = price * quantity;

    // 보유 수량 업데이트 또는 삭제
    const newQty = holding[0].quantity - quantity;
    if (newQty === 0) {
      await db.query(
        "DELETE FROM stockAssets WHERE user_id = ? AND stock_id = ?",
        [user_id, stock_id]
      );
    } else {
      await db.query(
        "UPDATE stockAssets SET quantity = ? WHERE user_id = ? AND stock_id = ?",
        [newQty, user_id, stock_id]
      );
    }

    // 현금 증가
    await db.query("UPDATE assets SET cash = cash + ? WHERE user_id = ?", [
      totalPrice,
      user_id,
    ]);

    //현재 현금 잔액 조회
    const [currentCash] = await db.query(
      "SELECT cash FROM assets WHERE user_id = ?",
      [user_id]
    );
    const cashAfter = currentCash[0].cash;

    // 거래 기록
    await db.query(
      "INSERT INTO transactions (type, user_id, stock_id, quantity, total_price, cash_after, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      ["sell", user_id, stock_id, quantity, totalPrice, cashAfter]
    );

    res.json({ message: "매도 성공", total_price: totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
};

exports.getMyTransactions = async (req, res) => {
  const user_id = req.user.id;

  try {
    const [transactions] = await db.query(
      `
        SELECT 
          t.id,
          t.type,
          t.quantity,
          t.total_price,
          t.cash_after,
          t.created_at,
          s.company_name,
          s.symbol
        FROM transactions t
        JOIN stocks s ON t.stock_id = s.id
        WHERE t.user_id = ?
        ORDER BY t.created_at DESC
      `,
      [user_id]
    );

    res.json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
};
