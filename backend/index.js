const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const expensesRoutes = require('./src/routes/expenses.routes');


const app = express();

// Seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting solo en auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // máximo 10 intentos
  message: { message: 'Demasiados intentos, espera 15 minutos' }
});

app.use('/api/auth', authLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Finexa API corriendo' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});