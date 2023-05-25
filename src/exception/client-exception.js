class ClientException extends Error {
  constructor(code, message, ...param) {
    super(...param);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientException);
    }

    this.code = code;
    this.message = message;
  }
}

const createClientException = (code, message, ...param) =>
  new ClientException(code, message, ...param);

module.exports = createClientException;
