const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const config = require('./utils/config');
const { handleError } = require('./utils/errors/handleerror');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const router = require('./routes/index');

// конфигурация .env
config();

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesDB', {
  useNewUrlParser: true,
});

app.use(cookieParser()); // распарсить куки
app.use(express.json()); // распарсить json

app.use(requestLogger); // подключаем логгер перед обработчиками роутов

app.use(cors); // подключаем CORS

app.use(router); // подключаем все роуты

app.use(errorLogger); // логгер ошибок после обработки роутов, но перед обработкой ошибок

app.use(errors());
app.use(handleError);

app.listen(process.env.port || 3000, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log('Слушаю и повинуюсь');
});
