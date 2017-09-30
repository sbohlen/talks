var messages = require("./messages.js");

module.exports = (bot) => {
    bot.dialog("noneIntentDialog", [
        (session, args, next) => {
            session.send(messages("hints"));
        }]).triggerAction({
            matches: "None",
            onSelectAction: (session, args, next) => {
                session.beginDialog(args.action, args);
            }
        });
};