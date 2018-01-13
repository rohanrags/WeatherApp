/*
Used in app.js

Using simple HTTP request module to call the dark sky API for weather information of a location.
The result(temperature) is returned in the callback function or errorMessage is returned.
*/

const request = require('request');

getWeather = (lat,lng,callback) => {
  request({
    url : `https://api.darksky.net/forecast/39692290828c7d0a5a5cc66a580c26d0/${lat},${lng}`,
    json : true
  },(error,response,body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temp : body.currently.temperature,
        apparentTemperature : body.currently.apparentTemperature
      });
    } else {
      callback("Unable to fetch weather for the location.");
    }
  });
};

module.exports.getWeather = getWeather;
