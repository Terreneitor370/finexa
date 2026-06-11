const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary
} = require('../controllers/expenses.controller');

router.use(verifyToken);

router.get('/summary', getSummary);
router.get('/', getExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;