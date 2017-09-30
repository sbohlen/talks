var synonymResolver = require("./synonymResolverService.js");
var trace = require("./traceCapture.js");

function resolveSynonyms(session, next) {

    trace(session, "Resolving Synonyms in: '" + session.message.text + "'");
    var results = synonymResolver.resolve(session.message.text);

    session.privateConversationData.synonymSubstitutions = results.substitutions;

    trace(session, "Synonyms Resolved: " + JSON.stringify(results));
    
    session.message.text = results.resolvedText;
    next();
};

module.exports = resolveSynonyms;