function registerDialogs(bot, builder) {
    require("./currentWeatherDialog.js")(bot, builder);
    require("./negativeSentimentResponseDialog.js")(bot);
    require("./noneIntentDialog.js")(bot);
}

module.exports = registerDialogs