const mongoose = require('mongoose');
const validator = require('validator');

const valudateURL = {
  validator: (value) => validator.isURL(value),
  message: (props) => `'${props.value}' неверный URL!`,
};

const movieSchema = new mongoose.Schema({
  // страна создания фильма
  country: {
    type: String,
    required: true,
  },
  // режиссёр фильма
  director: {
    type: String,
    required: true,
  },
  // длительность фильма; если <= 40 минут, то это коротрометражка
  duration: {
    type: Number,
    required: true,
  },
  // год выпуска фильма
  year: {
    type: String,
    required: true,
    match: /\d{4}/,
    validate: {
      validator: (value) => new Date(1900, 1) <= new Date(value, 1)
        && new Date(value, 1) < new Date(),
      message: (props) => `'${props.value}' нереальный год`,
    },
  },
  // описание фильма
  description: {
    type: String,
    required: true,
  },
  // ссылка на постер к фильму
  image: {
    type: String,
    required: true,
    validate: valudateURL,
  },
  // ссылка на трейлер фильма
  trailerLink: {
    type: String,
    required: true,
    validate: valudateURL,
  },
  // миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: true,
    validate: valudateURL,
  },
  // _id пользователя, который сохранил фильм
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  // название фильма на русском языке
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isAlphanumeric(value, 'ru-RU', { ignore: ' -.,:()' }),
      message: (props) => `'${props.value}' должно быть на русском языке`,
    },
  },
  // название фильма на английском языке
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isAlphanumeric(value, 'en-US', { ignore: ' -.,:()' }),
      message: (props) => `'${props.value}' должно быть на английском языке`,
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
