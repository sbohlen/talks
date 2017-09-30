var checkSpelling = require("./spellCheckMiddleware.js");
var resolveSynonyms = require("./synonymResolverMiddleware.js");
var detectLocalization = require("./localizationDetectorMiddleware.js");
var logIncomingAndOutgoingMessage = require("./loggingMiddleware.js");
var calculateAndEvaluateSentiment = require("./sentimentScoringMiddleware.js");
var countInteractions = require("./interactionCounterMiddleware.js");
var respondToInteractions = require("./interactionCounterResponseMiddleware.js");
var slashCommandInterceptor = require("./slashCommandInterceptorMiddleware.js");
var trace = require("./traceCapture.js");

function registerMiddleware(bot) {

    //logging of all incoming and outgoing messages
    bot.use({
        botbuilder: function (session, next) {
            trace(session, "Incoming Message: '" + session.message.text + "'");
            logIncomingAndOutgoingMessage(session.message.text, next);
        },
        send: function (event, next) {
            trace(session, "Outgoing Message: '" + event.text + "'");
            logIncomingAndOutgoingMessage(event.text, next);
        }
    });

    //register slash-command interceptor
    bot.use({
        botbuilder: function (session, next) {
            slashCommandInterceptor(session, next);
        }
    });

    //register localization detection
    bot.use({
        botbuilder: function (session, next) {
            detectLocalization(session, next);
        }
    });

    //register spell checker
    bot.use({
        botbuilder: function (session, next) {
            checkSpelling(session, next);
        }
    });

    //calculate and update running tally of sentiment
    bot.use({
        botbuilder: function (session, next) {
            calculateAndEvaluateSentiment(session, next);
        }
    });

    //register synonym resolver
    bot.use({
        botbuilder: function (session, next) {
            resolveSynonyms(session, next);
        }
    });

    //register interaction counter
    bot.use({
        botbuilder: function (session, next) {
            countInteractions(session);
            respondToInteractions(session, next);
        }
    });
};


module.exports = registerMiddleware;