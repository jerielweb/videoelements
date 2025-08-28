const path = require('path');
const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta al archivo users.json dentro de JS/
const dataPath = path.join(__dirname, 'users.json');

// Ruta a los archivos públicos (raíz del proyecto)
const publicPath = path.join(__dirname, '..');

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

// Cargar usuarios
let users = [];
if (fs.existsSync(dataPath)) {
  users = JSON.parse(fs.readFileSync(dataPath));
}

// Endpoint de registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Usuario ya existe' });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  res.json({ message: 'Usuario registrado', success: true });
});

// Endpoint de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciales inválidas', success: false });
  }
  res.json({ message: 'Login exitoso', success: true });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});