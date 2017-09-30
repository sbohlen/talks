var messages = require("./messages.js");
var trace = require("./traceCapture.js");

function interceptSlashCommands(session, next) {

    trace(session, "Checking for slash-command prefix in: '" + session.message.text + "'");

    var isSlashCommand = session.message.text.startsWith("/");

    if (!isSlashCommand) {
        trace(session, "slash-command prefix not found in: '" + session.message.text + "'");

        //if not a slash-command input, call next NOW to move processing to next step in pipeline
        next();
    }
    else {
        //extract the command minus the leading "/" converted to lowercase
        var command = session.message.text.substr(1).toLowerCase();

        trace(session, "Command " + command + " found.");

        if (command == "enabletrace") {
            session.send("DEBUG tracing output ENABLED.");
            session.conversationData.enableDebugTrace = true;
            return;
        };

        if (command == "disabletrace") {
            session.send("DEBUG tracing output DISABLED.");
            session.conversationData.enableDebugTrace = false;
            return;
        };

        session.send(messages("commandNotRecognized"));
    };
};

module.exports = interceptSlashCommands;