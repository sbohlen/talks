var request = require("request");
var config = require("./configuration.js");
var xpath = require("xpath");
var xmlDom = require("xmldom").DOMParser


var urlTemplate = "https://api.microsofttranslator.com/V2/Http.svc/Translate?text={text}&to={toLanguage}";

var languageTranslator = function () { }

function extractResult(xmlString){
    var doc = new xmlDom().parseFromString(xmlString);
    return doc.childNodes[0].firstChild.data;
}


languageTranslator.prototype.translate = function (message, language, callback) {

    var url = urlTemplate.replace("{text}", message).replace("{toLanguage}", language);

    var options = {
        url: url,
        headers: {
            "Ocp-Apim-Subscription-Key": config.textTranslationServiceApiKey,
        },
    };

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var result = extractResult(body);
            callback(result);
        }
    })
};

module.exports = new languageTranslator();