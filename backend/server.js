const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8084;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршруты
app.use('/', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server runing on ${PORT}`);
});
