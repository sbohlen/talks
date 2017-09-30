var config = require("./configuration.js");

module.exports = (bot, builder) => {
    bot.recognizer(new builder.LuisRecognizer(config.luisServiceUrl));
};