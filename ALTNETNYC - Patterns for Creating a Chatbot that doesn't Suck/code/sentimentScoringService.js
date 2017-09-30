var request = require("request");
var config = require("./configuration.js");


var urlTemplate = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";

function readScore(results) {

    //score is a value betw 0 (neg) and 1 (pos) so 0.5 = neutral as a default
    var score = 0.5;

    var result = results.documents.find(d => d.id === "1");

    if (result) {
        score = result.score;
    }

    return score;
};


var scorer = function () { }

scorer.prototype.getScore = function (input, language, callback) {

    var postData = {
        "documents": [
            {
                "id": "1",
                "language": language,
                "text": input
            },
        ]
    };

    var options = {
        url: urlTemplate,
        headers: {
            "Ocp-Apim-Subscription-Key": config.textAnalyticsServiceApiKey,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "post",
        body: JSON.stringify(postData)
    };

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body);
            let score = readScore(results);
            callback(score);
        }
    })
};

module.exports = new scorer();