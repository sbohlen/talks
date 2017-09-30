 var trace = require("./traceCapture.js");

function isValueSetOn(stateStore) {
    return stateStore && stateStore.interactionCount;
}

var incrementCounters = function (session) {

    if (session.userData) {
        session.userData.interactionCount = isValueSetOn(session.userData) ? ++session.userData.interactionCount : 1;
        trace(session, "USER interaction count increased to " + session.userData.interactionCount);
    }
    if (session.privateConversationData) {
        session.privateConversationData.interactionCount = isValueSetOn(session.privateConversationData) ? ++session.privateConversationData.interactionCount : 1;
        trace(session, "CONVERSATION interaction count increased to " + session.privateConversationData.interactionCount);
    }

    if (session.dialogData) {
        session.dialogData.interactionCount = isValueSetOn(session.dialogData) ? ++session.dialogData.interactionCount : 1;
        trace(session, "DIALOG interaction count increased to " + session.dialogData.interactionCount);
    }
}

module.exports = incrementCounters;