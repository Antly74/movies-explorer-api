function handleError(err, req, res, next) {
  const { status = 500 } = err;
  const message = `${status === 500 ? 'Ошибка сервера: ' : ''}${err.message} (${err.name})`;

  res.status(status).send({ message });

  next();
}

module.exports = { handleError };
