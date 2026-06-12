const pool = require('../db/connection');

const categoriasValidas = ['comida','transporte','entretenimiento','salud','ropa','educacion','otro','ingreso'];

const validarMonto = (amount) => {
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || Math.abs(amountNum) < 1 || Math.abs(amountNum) > 99999999.99) {
    return 'El monto debe ser entre $1.00 y $99,999,999.99';
  }
  return null;
};

const validarCategoria = (category, amountNum) => {
  if (!categoriasValidas.includes(category)) {
    return 'Categoría no válida';
  }
  if (category === 'ingreso' && amountNum < 0) {
    return 'Un ingreso debe tener monto positivo';
  }
  if (category !== 'ingreso' && amountNum > 0) {
    return 'Un gasto debe tener monto negativo';
  }
  return null;
};

const validarFecha = (date) => {
  const expenseDate = new Date(date);
  if (isNaN(expenseDate.getTime())) {
    return 'Fecha no válida';
  }
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 1);
  minDate.setHours(0, 0, 0, 0);
  if (expenseDate > today) {
    return 'No puedes registrar gastos con fecha futura';
  }
  if (expenseDate < minDate) {
    return 'No puedes registrar gastos con más de un año de antigüedad';
  }
  return null;
};

const validarDescripcion = (description) => {
  if (description && description.length > 255) {
    return 'La descripción no puede exceder 255 caracteres';
  }
  if (description && /<[^>]*>/g.test(description)) {
    return 'La descripción contiene caracteres no permitidos';
  }
  return null;
};

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

  const amountNum = parseFloat(amount);

  const errorMonto = validarMonto(amount);
  if (errorMonto) return res.status(400).json({ message: errorMonto });

  const errorCategoria = validarCategoria(category, amountNum);
  if (errorCategoria) return res.status(400).json({ message: errorCategoria });

  const errorFecha = validarFecha(date);
  if (errorFecha) return res.status(400).json({ message: errorFecha });

  const errorDescripcion = validarDescripcion(description);
  if (errorDescripcion) return res.status(400).json({ message: errorDescripcion });

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

  if (!amount || !category || !date) {
    return res.status(400).json({ message: 'Monto, categoría y fecha son requeridos' });
  }

  const amountNum = parseFloat(amount);

  const errorMonto = validarMonto(amount);
  if (errorMonto) return res.status(400).json({ message: errorMonto });

  const errorCategoria = validarCategoria(category, amountNum);
  if (errorCategoria) return res.status(400).json({ message: errorCategoria });

  const errorFecha = validarFecha(date);
  if (errorFecha) return res.status(400).json({ message: errorFecha });

  const errorDescripcion = validarDescripcion(description);
  if (errorDescripcion) return res.status(400).json({ message: errorDescripcion });

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

    const [totalGastadoRow] = await pool.query(
      `SELECT SUM(ABS(amount)) as total
       FROM expenses
       WHERE user_id = ?
       AND amount < 0
       AND MONTH(date) = MONTH(CURDATE())
       AND YEAR(date) = YEAR(CURDATE())`,
      [req.userId]
    );

    const [totalIngresosRow] = await pool.query(
      `SELECT SUM(amount) as total
       FROM expenses
       WHERE user_id = ?
       AND amount > 0
       AND MONTH(date) = MONTH(CURDATE())
       AND YEAR(date) = YEAR(CURDATE())`,
      [req.userId]
    );

    const totalGastado = parseFloat(totalGastadoRow[0].total) || 0;
    const totalIngresos = parseFloat(totalIngresosRow[0].total) || 0;
    const balance = totalIngresos - totalGastado;

    res.json({
      categories: summary,
      totalGastado,
      totalIngresos,
      balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense, getSummary };