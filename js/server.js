const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const publicPath = path.join(__dirname, '..');

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

// Registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Faltan datos' });

  try {
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = 1',
      [username]
    );

    if (existingUser.rows.length > 0)
      return res.status(400).json({ message: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, password) VALUES (1, $2)',
      [username, hashed]
    );

    res.json({ message: 'Usuario registrado', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  );

// Login
app.post('/login', async (req, res) => 
  const  username, password  = req.body;

  try 
    const result = await pool.query(
      'SELECT * FROM users WHERE username =1',
      [username]
    );
    const user = result.rows[0];
    if (!user)
      return res
        .status(401)
        .json({ message: 'Credenciales inválidas', success: false });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(401)
        .json({ message: 'Credenciales inválidas', success: false });

    res.json({ message: 'Login exitoso', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});