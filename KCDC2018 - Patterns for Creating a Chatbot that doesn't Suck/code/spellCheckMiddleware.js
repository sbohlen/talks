var spellChecker = require("./spellCheckService.js");
var trace = require("./traceCapture.js");

function checkSpelling(session, next) {

    trace(session, "Spellchecking input: '" + session.message.text + "'");

    spellChecker.check(session.message.text, (text) => {
        session.message.text = text;
        trace(session, "Spellchecking output: '" + session.message.text + "'");
        next();
    });
};

module.exports = checkSpelling;