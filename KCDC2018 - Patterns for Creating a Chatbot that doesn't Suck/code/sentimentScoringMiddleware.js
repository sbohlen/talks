var sentimentScorer = require("./sentimentScoringService.js");
var messages = require("./messages.js");
var trace = require("./traceCapture.js");

function calculateAndEvaluateSentiment(session, next) {
    trace(session, "Calculating sentiment for input: '" + session.message.text + "'");

    updateConversationSentiment(session, () => {

        if (checkSentimentOK(session)) {
            trace(session, "Sentiment evaluated as within tolerance.");
            next();
        }
        else {
            trace(session, "Sentiment evaluated as beyond tolerance.");
            session.beginDialog("negativeSentimentResponseDialog");
        };

    });
};

function checkSentimentOK(session) {
    var singleScoreAlertThreshold = 0.2;
    var lastScore = session.privateConversationData.sentiment.history[session.privateConversationData.sentiment.history.length - 1];

    if (lastScore < singleScoreAlertThreshold) {
        return false;
    };

    return analyzeDeltas(session.privateConversationData.sentiment.deltas);
}

function analyzeDeltas(deltas) {

    //if there aren't at least 2 entries, no point in proceeding w analysis
    if (deltas.length < 2) {
        return true;
    }

    var workbackCounter = deltas.length < 3 ? deltas.length : 3;

    var toAnalyze = [];

    for (let i = 1; i <= workbackCounter; i++) {
        toAnalyze.push(deltas[deltas.length - i]);
    };

    var negativeSentimentInAnalysisSet = toAnalyze.filter(entry => entry < 0);

    return negativeSentimentInAnalysisSet.length != toAnalyze.length;
}

function updateConversationSentiment(session, callback) {
    sentimentScorer.getScore(session.message.text, session.privateConversationData.language, (score) => {

        trace(session, "Sentiment Score returned: " + score);

        var sentimentTracking = session.privateConversationData.sentiment || {};
        var history = sentimentTracking.history || [];
        var deltas = sentimentTracking.deltas || [];

        history.push(score);
        if (history.length > 1) {
            deltas.push(parseFloat(history[history.length - 1].toFixed(20)) - parseFloat(history[history.length - 2].toFixed(20)));
        }

        sentimentTracking.history = history;
        sentimentTracking.deltas = deltas;
        session.privateConversationData.sentiment = sentimentTracking;

        callback();
    });
};

module.exports = calculateAndEvaluateSentiment;