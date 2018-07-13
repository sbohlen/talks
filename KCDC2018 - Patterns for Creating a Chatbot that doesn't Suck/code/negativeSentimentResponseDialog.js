var messages = require("./messages.js");

module.exports = (bot) => {
    bot.dialog("negativeSentimentResponseDialog",[
        (session) => {
            session.send(messages("negativeExperienceApology"));
            session.send(messages("hints"));
            session.endDialog(messages("escapeHatch"));
        }
    ]);
}