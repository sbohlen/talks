var detectorService = require("./localizationDetectorService.js");
var messages = require("./messages.js");
var trace = require("./traceCapture.js");

var detectLocalization = function (session, next) {

    trace(session, "Detecting language in: '" + session.message.text + "'");

    detectorService.detect(session.message.text, (language) => {

        //only supported language
        if (language === "en") {
            trace(session, "ENGLISH language detected.");

            //persist in case needed elsewhere
            session.privateConversationData.language = language;
            next();
        }
        else {
            if (language == "(Unknown)") {
                trace(session, "UNKNOWN language detected.");

                session.send(messages("unsupportedLanguage"));
            } else {
                trace(session, "'" + language + "'" + " language detected.");

                messages("unsupportedLanguage", language, translatedMessage => {
                    session.send(translatedMessage);
                });

            }

            //next(); <-- important: we are NOT calling next b/c the objective is to ABORT further processing
        };
    });
}

module.exports = detectLocalization;