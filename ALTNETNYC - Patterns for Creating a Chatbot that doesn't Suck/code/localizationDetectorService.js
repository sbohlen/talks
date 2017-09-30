var request = require("request");
var config = require("./configuration.js");


var urlTemplate = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/languages";

function readLanguage(results) {

    var language = "unknown";

    var result = results.documents.find(d => d.id === "1");

    if (result) {
        var languageEntry = result.detectedLanguages.sort((a, b) => { b.score - a.score })[0];
    }

    if (languageEntry) {
        language = languageEntry.iso6391Name;
    };

    return language;
};


var localizationDetector = function () { }

localizationDetector.prototype.detect = function (input, callback) {

    var postData = {
        "documents": [
            {
                "id": "1",
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
            let language = readLanguage(results);
            callback(language);
        }
    })
};

module.exports = new localizationDetector();