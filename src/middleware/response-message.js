const logger = require("../loaders/logger");

module.exports = () => function (req, res, next) {
    logger.debug(`init response message middleWare : ${new Date()}`);
    req.responseObject = {"code": 200, "message": "", "result" : {}};
    next();
 }