class ClientException extends Error {
  constructor(code, message, ...param) {
    super(...param);

    this.code = code;
    this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientException);
    }
  }
}

const createClientException = async (code, message, ...param) => {
  throw new ClientException(code, message, ...param);
};

module.exports = { createClientException, ClientException };
