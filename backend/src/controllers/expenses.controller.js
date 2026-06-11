const pool = require('../db/connection');

const getExpenses = async (req, res) => {
  try {
    const [expenses] = await pool.query(
      'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC',
      [req.userId]
    );
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const createExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  if (!amount || !category || !date) {
    return res.status(400).json({ message: 'Monto, categoría y fecha son requeridos' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO expenses (user_id, amount, category, description, date) VALUES (?, ?, ?, ?, ?)',
      [req.userId, amount, category, description || null, date]
    );

    const [newExpense] = await pool.query('SELECT * FROM expenses WHERE id = ?', [result.insertId]);
    res.status(201).json(newExpense[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date } = req.body;

  try {
    const [existing] = await pool.query(
      'SELECT id FROM expenses WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    await pool.query(
      'UPDATE expenses SET amount = ?, category = ?, description = ?, date = ? WHERE id = ?',
      [amount, category, description || null, date, id]
    );

    const [updated] = await pool.query('SELECT * FROM expenses WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const [existing] = await pool.query(
      'SELECT id FROM expenses WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    await pool.query('DELETE FROM expenses WHERE id = ?', [id]);
    res.json({ message: 'Gasto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const getSummary = async (req, res) => {
  try {
    // Solo gastos (amount < 0)
    const [summary] = await pool.query(
      `SELECT category, SUM(ABS(amount)) as total
       FROM expenses
       WHERE user_id = ?
       AND amount < 0
       AND MONTH(date) = MONTH(CURDATE())
       AND YEAR(date) = YEAR(CURDATE())
       GROUP BY category`,
      [req.userId]
    );

    const [totalRow] = await pool.query(
      `SELECT SUM(ABS(amount)) as total
       FROM expenses
       WHERE user_id = ?
       AND amount < 0
       AND MONTH(date) = MONTH(CURDATE())
       AND YEAR(date) = YEAR(CURDATE())`,
      [req.userId]
    );

    res.json({
      categories: summary,
      total: totalRow[0].total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense, getSummary };