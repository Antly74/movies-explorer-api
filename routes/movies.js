const movieRouter = require('express').Router();
const { saveMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateMovie, validateDeleteMovie } = require('../middlewares/validators');

movieRouter.post('/', validateMovie, saveMovie);
movieRouter.get('/', getMovies);
movieRouter.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = movieRouter;
