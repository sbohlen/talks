var messages = require("./messages.js");

var registerHandlers = function (bot, builder) {
    
    //conversationUpdate event
    bot.on('conversationUpdate', function (message) {
        var botId = message.address.bot.id;
    
        if (message.membersAdded && message.membersAdded.length > 0) {
            for (var i = 0; i < message.membersAdded.length; i++) {
                if (message.membersAdded[i].id != botId) {
                    bot.send(new builder.Message()
                        .address(message.address)
                        .text(messages("welcome"))
                    );
                    setTimeout(() => {
                        bot.send(new builder.Message()
                            .address(message.address)
                            .text(messages("hints"))
                        )
                    }, 1000);
                }
            }
        } else if (message.membersRemoved) {
            for (var i = 0; i < message.membersRemoved.length; i++) {
                if (message.membersRemoved[i].id != botId) {
                    bot.send(new builder.Message()
                        .address(message.address)
                        .text(messages("goodbye")));
                    break;
                }
            }
        }
    });
};



module.exports = registerHandlers;