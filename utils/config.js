const { config } = require('dotenv');

module.exports = () => {
  config();

  const { NODE_ENV = 'dev', JWT_SECRET, mongodb } = process.env;

  if (!JWT_SECRET || JWT_SECRET.length < 64) {
    if (NODE_ENV === 'production') {
      throw new Error('Не установлен ключ шифрования или ключ слишком короткий, работа невозможна!');
    } else {
      process.env.JWT_SECRET = 'cf38a821e4225f229e0ea05eef1490601838944b89442822cb739507a37b899f';
      // сгенерировать ключик
      // node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
    }
  }

  if (!mongodb) {
    if (NODE_ENV === 'production') {
      throw new Error('Не установлен коннект к базе данных, работа невозможна!');
    } else {
      process.env.mongodb = 'mongodb://localhost:27017/moviesDB';
    }
  }
};
