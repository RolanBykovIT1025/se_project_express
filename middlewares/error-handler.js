const { SERVER_ERROR } = require("../utils/errors");

const errorHandler = (err, req, res, _next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === SERVER_ERROR
        ? "An error has occurred on the server"
        : message,
  });
};

module.exports = errorHandler;
