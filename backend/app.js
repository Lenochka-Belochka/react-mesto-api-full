require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorRouter = require('./routes/error');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLoger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());

app.use(requestLogger);
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
    }),
  }),
  createUser,
);

app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);
app.all('*', auth, errorRouter);
app.use(errorLoger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
