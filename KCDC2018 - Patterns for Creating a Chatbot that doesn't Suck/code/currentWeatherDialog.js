var weatherService = require("./weatherService.js");
var messages = require("./messages.js");
var synonymResolver = require("./synonymResolverService.js");
var trace = require("./traceCapture.js");
var richWeatherCardSample = require("./richWeatherCardSample.js");

var botBuilder;

function getWeatherReportMessageTemplate(hasPrecip) {
    if (!hasPrecip) {
        return messages("weatherReportWithoutPrecipType");
    }
    else {
        return messages("weatherReportWithPrecipType");
    }
}

module.exports = (bot, builder) => {

    botBuilder = builder;

    bot.dialog("currentWeatherDialog", [
        (session, args, next) => {

            //if we get here without an intent...
            if (!args.intent) {
                trace(session, "No INTENT detected from LUIS.");
                session.send(messages("cantDetermineLocation"));
                session.endDialog("hints");
                return;
            }

            var forecastLocation = getForecastLocation(session, args);
            trace(session, "Forecast Location Determined: " + JSON.stringify(forecastLocation));

            var forecastDateRange = getForecastDateRange(session, args);
            trace(session, "Forecast DateRange Determined: " + JSON.stringify(forecastDateRange));

            if (!forecastLocation) {
                trace(session, "No builtin.geography entity detected from LUIS.")
                session.endDialog(messages("cantDetermineLocation"));
                session.send(messages("hints"));

            } else {
                trace(session, "LUIS builtin.geography entity found: " + JSON.stringify(forecastLocation));
                var locationWeather = weatherService.getWeather(forecastLocation.entity);

                if (!locationWeather) {
                    trace(session, "No weather data entry found for location: " + forecastLocation.entity);

                    session.endDialog(messages("noWeatherForLocation"));
                }
                else {
                    trace(session, "Weather data retrieved for location '" + forecastLocation.entity + "': " + JSON.stringify(locationWeather));

                    var matchingForecasts = locationWeather.weather.filter(forecast => forecastDateRange.startDate <= forecast.date && forecast.date <= forecastDateRange.endDate);

                    if (!matchingForecasts || !matchingForecasts.length > 0) {
                        trace(session, "No weather entry for dates " + forecastDateRange.startDate.toISOString() + "-" + forecastDateRange.endDate.toISOString());

                        session.endDialog(messages("noWeatherForDate"));
                    }
                    else {

                        if (matchingForecasts.length == 1) {
                            var weather = matchingForecasts[0];

                            trace(session, "Weather entry found for dates " + forecastDateRange.startDate.toISOString() + "-" + forecastDateRange.endDate.toISOString() + ": " + JSON.stringify(weather));
                            var hasPrecip = weather.precipChance > 0;

                            trace(session, "Weather has precipitation chance: " + hasPrecip);
                            var messageTemplate = getWeatherReportMessageTemplate(hasPrecip);

                            trace(session, "Preparing forecast response using template: " + messageTemplate);
                            var messageWithData = populateWeatherReportMessageTemplate(messageTemplate, locationWeather.location, weather, hasPrecip);

                            trace(session, "Reverting Synonyms for output: '" + messageWithData + "'");
                            var message = revertSynonymReplacement(messageWithData, session.privateConversationData.synonymSubstitutions);

                            trace(session, "Sending response message: " + messageWithData);
                            session.endDialog(messageWithData);
                            return;
                        } else {

                            for (let i = 0; i < matchingForecasts.length; i++) {
                                //TODO: build rich card from each matching forecast
                            };

                            var msg = new builder.Message(session).addAttachment({
                                contentType: "application/vnd.microsoft.card.adaptive",
                                content: richWeatherCardSample
                            });
                            session.send(msg).endDialog();
                        }
                    }
                }
            }
        }]).triggerAction({
            matches: "getForecast",
            onSelectAction: (session, args, next) => {
                session.beginDialog(args.action, args);
            }
        });
};

function revertSynonymReplacement(input, synonymSubstitutions) {
    return input; //for now, just return INPUT directly

    //TODO: review this approach since it will result in echoing back EXACTLY what the user entered instead of the 'prettified' synonym value
    return synonymResolver.revert(input, synonymSubstitutions);
}

function buildPrettyDateString(date) {
    return (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear();
}

function buildPrettyPrecipChanceString(percentAsDecimal) {
    return (percentAsDecimal * 100) + "%";
}

function buildPrettyDayOfWeekString(date){
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getUTCDay()];
}

function populateWeatherReportMessageTemplate(template, forecastLocation, weather, hasPrecip) {
    var message = template.replace("${dayOfWeek}", buildPrettyDayOfWeekString(weather.date))
        .replace("${date}", buildPrettyDateString(weather.date))
        .replace("${location}", forecastLocation)
        .replace("${high}", weather.high)
        .replace("${low}", weather.low)
        .replace("${precipChance}", buildPrettyPrecipChanceString(weather.precipChance))
        .replace("${sky}", weather.sky)
        .replace("${windDirection}", weather.windDirection)
        .replace("${windSpeed}", weather.windSpeed);

    if (hasPrecip) {
        message = message.replace("${precipType}", weather.precipType);
    }

    return message;
}

function getForecastLocation(session, args) {

    var parsedLocation = botBuilder.EntityRecognizer.findEntity(args.intent.entities, "builtin.geography.city");
    if (parsedLocation) {
        storeAmbientLocation(session, parsedLocation);
    }

    return getAmbientLocation(session);
}

function storeAmbientLocation(session, location) {
    if (session && session.conversationData) {
        if (!session.conversationData.ambientContext) {
            session.conversationData.ambientContext = {};
        }

        session.conversationData.ambientContext.location = location
    }
}


function getAmbientLocation(session) {
    if (session && session.conversationData && session.conversationData.ambientContext) {
        return session.conversationData.ambientContext.location;
    }
    else {
        return null;
    }
}

function getForecastDateRange(session, args) {

    var dateRange = botBuilder.EntityRecognizer.findEntity(args.intent.entities, "builtin.datetimeV2.daterange");
    var datetimeRange = botBuilder.EntityRecognizer.findEntity(args.intent.entities, "builtin.datetimeV2.datetimerange");
    var date = botBuilder.EntityRecognizer.findEntity(args.intent.entities, "builtin.datetimeV2.date");

    //get either of the non-null range types (must be either 0 or 1 of them)
    var range = dateRange || datetimeRange;

    if (range) {
        var start = new Date(range.resolution.values[0].start);
        start.setUTCHours(0);
        start.setUTCMinutes(0);
        start.setUTCSeconds(0);
        start.setUTCMilliseconds(0);

        var end = new Date(range.resolution.values[0].end);
        end.setUTCHours(0);
        end.setUTCMinutes(0);
        end.setUTCSeconds(0);
        end.setUTCMilliseconds(0);

        var result = {
            startDate: new Date(start),
            endDate: new Date(end)
        };

        storeAmbientDateRange(session, result);
    };

    if (date) {
        var extractedDate = extractDateInFutureFrom(date);

        if (extractedDate) {
            extractedDate.setUTCHours(0);
            extractedDate.setUTCMinutes(0);
            extractedDate.setUTCSeconds(0);
            extractedDate.setUTCMilliseconds(0);

            var result = {
                startDate: extractedDate,
                endDate: extractedDate
            };

            storeAmbientDateRange(session, result);
        }
    };

    var result = getAmbientDateRange(session);

    if (!result) {

        var today = new Date();
        today.setUTCHours(0);
        today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        today.setUTCMilliseconds(0);

        var result = {
            startDate: today,
            endDate: today
        };

        storeAmbientDateRange(session, result);
    };

    return getAmbientDateRange(session);
}

//LUIS will return nearest both *past* and *future* date(s) for resolving e.g., "Monday",
//  so have to ensure we pick the one that's in the future
function extractDateInFutureFrom(date) {

    var today = new Date();
    today.setUTCHours(0);
    today.setUTCMinutes(0);
    today.setUTCSeconds(0);
    today.setUTCMilliseconds(0);

    for (var i = 0; i < date.resolution.values.length; i++) {

        var candidate = new Date(date.resolution.values[i].value);

        if (candidate >= today) {
            return candidate;
        }
    }
}


function getAmbientDateRange(session) {
    if (session && session.conversationData && session.conversationData.ambientContext && session.conversationData.ambientContext.startDate && session.conversationData.ambientContext.endDate) {
        var startDate = session.conversationData.ambientContext.startDate;
        var endDate = session.conversationData.ambientContext.endDate;

        return {
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        };
    }
    else {
        return null;
    }
}

function storeAmbientDateRange(session, dateRange) {
    if (session && session.conversationData) {
        if (!session.conversationData.ambientContext) {
            session.conversationData.ambientContext = {};
        }

        session.conversationData.ambientContext.startDate = dateRange.startDate.toISOString();
        session.conversationData.ambientContext.endDate = dateRange.endDate.toISOString();
    }
}

