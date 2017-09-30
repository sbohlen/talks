var languageTranslator = require("./languageTranslationService.js");

var getMessage = function (messageId, language, callback) {

    if (!language) {
        language = "en";
    }

    if (language === "en") {
        return getSingleMessage(messageId);
    }
    else {
        getTranslation(getSingleMessage("unsupportedLanguage"), language, (result) => {
            callback(result);
        });
    }
};

function getSingleMessage(messageId) {
    var candidateMessages = messages[messageId];

    if (candidateMessages) {
        if (candidateMessages.constructor == Array) {
            return candidateMessages[Math.floor(Math.random() * candidateMessages.length)];
        }
        else {
            return candidateMessages;
        }
    }
}

function getTranslation(message, language, callback) {
    languageTranslator.translate(message, language, callback);
}

//TODO: read messages from disk or elsewhere
var messages = {
    welcome: [
        "Welcome to the Weather Bot!",
        "Hi, I'm the Weather Bot, pleased to meet you!"
    ],

    hints: "You can say : 'How is the weather in San Francisco?' or 'What is the forecast for Friday in New York?'",

    goodbye: [
        "Thanks for playing!",
        "Come back soon!",
        "Hope I was able to help!"
    ],

    unsupportedLanguage: "Sorry, your language is unsupported at this time.  Try back again later!  Supported languages are: English.",

    valuedUser: [
        "I hate to interrupt, but thanks for using me so much -- you're well on your way to our user hall-of-fame!",
        "Wow -- you really like the weather!  You're one of our busiest users!",
    ],

    noWeatherForLocation: [
        "Sorry, I don't know the weather for that location.  I can cover most (but not all) of the continental United States.",
        "Uh-oh, I'm not sure exactly what the weather is there at the moment.  Sorry!"
    ],

    noWeatherForDate: [
        "Sorry, I know that location, but I don't seem to have the forecast for that date.",
        "Unfortunately I don't know the weather on that date.  Maybe try a different date...?"
    ],

    weatherReportWithoutPrecipType: [
        "The forecast for ${location} on ${date} is for ${sky} skies with a high of ${high} and a low of ${low}.  The chance of precipitation is zero.  Winds will be from the ${windDirection} at ${windSpeed} MPH."
    ],

    weatherReportWithPrecipType: [
        "The forecast for ${location} on ${date} is for ${sky} skies with a high of ${high} and a low of ${low}.  The chance of ${precipType} is ${precipChance}.  Winds will be from the ${windDirection} at ${windSpeed} MPH."
    ],
    cantDetermineLocation: [
        "I'm sorry, I can't understand a location from that.  Can you try again with a clearer location?",
    ],

    commandNotRecognized: [
        "Sorry, I don't recognize that command.",
        "I have no idea WTF that meant.",
        "That command is unsupported at this time",
    ],

    escapeHatch: [
        "For additional assistance you might try calling Customer Service for further assistance at (212) 555-1212.",
        "If you're having trouble getting what you want, we recommend that you try our website http://somedomain.com/botEscalation",
    ],
};


module.exports = getMessage;