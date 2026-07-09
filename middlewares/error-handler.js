const { CelebrateError } = require("celebrate");
const { SERVER_ERROR } = require("../utils/errors");

const errorHandler = (err, req, res, _next) => {
  if (err instanceof CelebrateError) {
    const errorBody = err.details.get("body")
      || err.details.get("params")
      || err.details.get("query");
    const messages = errorBody.details.map((detail) => detail.message);
    return res.status(400).send({
      message: `Validation failed: ${messages.join(", ")}`,
    });
  }

  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === SERVER_ERROR
        ? "An error has occurred on the server"
        : message,
  });
};

module.exports = errorHandler;
