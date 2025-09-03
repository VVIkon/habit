/**
 * Маршруты API для автомобилей
 */
const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// Routies
router.get("/api/shops", (req, res) => getShops(res));
router.get("/api/cars", (req,res) => getAutos(res));
router.post("/api/cars/new", (req, res) => setAuto(req,res));
router.get("/api/cars/:id", (req, res) => getAuto(req, res));
router.post("/api/cars/:id", (req, res) => updateAuto(req, res));


// DB Service
/**
 * GET / - Получение всех автомобилей с информацией о магазинах
 */
const getAutos = async (res) => {
	try {
		const query = `
		SELECT
		c.id,
		c.brand,
		c.model,
		c.price,
		s.name as shop,
		s.phone
		FROM cars c
		JOIN shops s ON c.shop_id = s.id
		ORDER BY c.brand, c.model
    `;

		const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

/**
 * GET / - Получение данных по магазинам
 */
	const getShops = async (res) => {
  try {
    const query = `
      SELECT
      id,
      name,
      phone
      FROM shops
      ORDER BY name
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

/**
 * GET / - Получение aвтомобиля по id
 */
const getAuto = async (req, res) =>	{
  const { id } = req.params;
  try {
    const query = `
      SELECT
        c.id,
        c.brand,
        c.model,
        c.price,
        s.name as shop,
        s.phone
      FROM cars c
      JOIN shops s ON c.shop_id = s.id
      WHERE c.id = $1
      ORDER BY c.brand, c.model
    `;

    const result = await pool.query(query, [id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

/**
 * POST /api/new - Добавление нового автомобиля
 */
const setAuto = async (req, res) => {
	const { brand, model, price, shop_id } = req.body;

  try {
    const query = `
      INSERT INTO cars (brand, model, price, shop_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(query, [brand, model, price, shop_id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при добавлении автомобиля:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

/**
 * POST /api/:id - Обновление данных автомобиля по ID
 */
const updateAuto = async (req, res) => {
  const { id } = req.params;
  const { brand, model, price, shop_id } = req.body;

  try {
    const query = `
      UPDATE cars
      SET brand = $1, model = $2, price = $3, shop_id = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;

    const result = await pool.query(query, [brand, model, price, shop_id, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Автомобиль не найден" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при обновлении данных автомобиля:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = router;
