const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const {
  register,
  login,
  validateRegister,
  validateLogin,
  getProfile,
  updateProfile,
  validateUpdateProfile,
  forgotPassword,
  resetPassword
} = require('../controllers/auth.controller');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, validateUpdateProfile, updateProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;