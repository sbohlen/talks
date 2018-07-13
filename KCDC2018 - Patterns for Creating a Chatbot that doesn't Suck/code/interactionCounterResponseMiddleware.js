var messages = require("./messages.js");
var trace= require("./traceCapture.js");

var respondToCounters = function (session, next) {

    if (session.userData.interactionCount % 5 == 0) {
        
        trace(session, "Valued User detected.");
        session.send(messages("valuedUser"));
    }

    next();
};

module.exports = respondToCounters;