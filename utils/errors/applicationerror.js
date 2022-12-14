class ApplicationError extends Error {
  constructor(status = 500, message = 'Что-то пошло не так!') {
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApplicationError;
