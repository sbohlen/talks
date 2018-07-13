var logger = require("./loggingService.js");

module.exports = function (text, next) {
    logger.log(text);
    next()
};

