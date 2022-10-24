const movieModel = require('../models/movie');
const NotFoundError = require('../utils/errors/notfounderror');
const ForbiddenError = require('../utils/errors/forbiddenerror');
const ValidationError = require('../utils/errors/validationerror');

module.exports.saveMovie = (req, res, next) => {
  movieModel
    .create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  movieModel
    .find({ owner: req.user._id })
    .sort('movieId')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id: id } = req.params;
  movieModel
    .findById(id)
    .orFail(() => {
      throw new NotFoundError(`Фильм с id = ${id} не найден!`);
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError();
      }
      return movie.deleteOne();
    })
    .then((movie) => {
      if (movie) {
        res.send({ message: 'Фильм удален' });
      }
    })
    .catch(next);
};
