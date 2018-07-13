var config = {
    botConnectorAppId: process.env.WEATHERBOT_BOT_CONNECTOR_APP_ID,
    botConnectorAppPassword: process.env.WEATHERBOT_BOT_CONNECTOR_APP_PASSWORD,
    spellcheckServiceApiKey: process.env.WEATHERBOT_SPELLCHECK_KEY,
    textAnalyticsServiceApiKey: process.env.WEATHERBOT_TEXTANALYTICS_KEY,
    textTranslationServiceApiKey: process.env.WEATHERBOT_TEXTTRANSLATION_KEY,
    luisServiceUrl: process.env.WEATHERBOT_LUIS_URL,
};

var optionalConfigValues = [
    "botConnectorAppId",
    "botConnectorAppPassword"
];

function validateConfig(config) {

    var errors = [];

    for (let propertyName in config) {
        if (!config[propertyName] && optionalConfigValues.indexOf(propertyName) < 0) {
            errors.push(new Error("You must set a value for " + propertyName + " in configuration.js"));
        }
    }

    if (errors.length > 0) {
        let error = new Error("One more required configuration values has not been set.  See .errors property of this Error object for details.");
        error.errors = errors;
        throw error;
    }
};


validateConfig(config);

module.exports = config;