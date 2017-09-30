require('dotenv').config();

var restify = require("restify");
var builder = require("botbuilder");
var messages = require("./messages.js");
var registerMiddleware = require("./middlewareRegistration.js");
var registerDialogs = require("./dialogRegistration.js");
var registerConversationEventHandlers = require("./conversationEventHandlers.js");
var registerRecognizers = require("./recognizerRegistration.js");
var config = require("./configuration.js");


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log("%s listening to %s", server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: config.botConnectorAppId,
    appPassword: config.botConnectorAppPassword
});

// Listen for messages from users 
server.post("/api/messages", connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    //session.beginDialog("currentWeatherDialog");
});

registerRecognizers(bot, builder);
registerMiddleware(bot);
registerConversationEventHandlers(bot, builder);
registerDialogs(bot, builder);