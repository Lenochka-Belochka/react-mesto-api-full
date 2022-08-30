require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { userValidation, loginValidation } = require('./middlewares/validation');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors({
  origin: 'https://mesto.first.project.nomoredomains.sbs',
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(express.json());
app.use(requestLogger);
app.post('/signup', userValidation, createUser);
app.post('/signin', loginValidation, login);
app.use(auth);
app.use(require('./routes/errorPath'));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
