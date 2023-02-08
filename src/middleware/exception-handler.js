'use strict';

const { StatusCodes } = require("http-status-codes");
const ClientException = require("../exception/client-exception");

module.exports = () => {
    return function (error, req, res, next) {
        if(error instanceof ClientException) {
            setErrorResponse(res, error.code, error.message);
        }
        setErrorResponse(res, StatusCodes.ACCEPTED, "");
        return next();
    };
}

function setErrorResponse(res, code, message) {
    res.status(code).json({"code" : code, "message": message});
}