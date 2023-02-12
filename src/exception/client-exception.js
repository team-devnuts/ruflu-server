'use strict';

class ClientException extends Error {
    constructor(code, message, ...param) {
        super(...param);

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, ClientException);
        }

        this.code = code;
        this.message = message;
    }
}

module.exports = ClientException;