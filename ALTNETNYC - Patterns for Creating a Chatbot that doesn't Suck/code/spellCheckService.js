var request = require('request');
var config = require("./configuration.js");


var urlTemplate = "https://api.cognitive.microsoft.com/bing/v5.0/spellcheck?text={text}";

var options = {
    url: urlTemplate,
    headers: {
        "Ocp-Apim-Subscription-Key": config.spellcheckServiceApiKey
    }
};

function applyResults(input, results) {
    for (let i = 0; i < results.flaggedTokens.length; i++) {
        let flaggedToken = results.flaggedTokens[i];
        let sortedSuggestions = flaggedToken.suggestions.sort((a, b) => { b.score - a.score });
        if (sortedSuggestions[0].score > .80) {
            input = input.replace(flaggedToken.token, sortedSuggestions[0].suggestion);
        };
    }

    return input;
};

var spellChecker = function () { }

spellChecker.prototype.check = function (input, callback) {
    options.url = urlTemplate.replace("{text}", input);

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body);
            input = applyResults(input, results);
            callback(input);
        }
    })
};

module.exports = new spellChecker();