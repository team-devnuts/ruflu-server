// const { StatusCodes } = require("http-status-codes");
const { ClientException } = require("../exception/client-exception");
const { logger } = require("../loaders/logger");

function setErrorResponse(res, code, message) {
  res.status(code).json({ code, message });
}

module.exports = () =>
  function (error, req, res, next) {
    logger.error(error);
    if (error instanceof ClientException) {
      setErrorResponse(res, error.code, error.message);
    }
    setErrorResponse(res, error.code, "");
  };
