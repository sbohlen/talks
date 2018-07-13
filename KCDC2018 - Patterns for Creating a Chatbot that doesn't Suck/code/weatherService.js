const data = require("./weatherData.js");

var weatherService = function () { }

weatherService.prototype.getWeather = function (location, startDate, endData) {
    var forecastData = data.find(el => el.location.toLowerCase() == location.toLowerCase());

    if (!forecastData) {
        return null
    }
    else {
        return {
            location: forecastData.location,
            weather: forecastData.weather
        }
    }

};

module.exports = new weatherService();
