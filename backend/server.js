const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Пример хранения пользователей в памяти (не используем базу данных)
const users = [];

// Секретный ключ для токенов
const SECRET_KEY = 'mysecretkey';

// Роут для регистрации
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Проверка, существует ли пользователь
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Хэширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: 'Registration successful' });
});

// Роут для логина
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Поиск пользователя
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Проверка пароля
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Генерация токена
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Welcome back', token });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
