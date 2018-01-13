/*
Used in app.js

Using simple HTTP request module to call Google Geocode API for lat, lng information of a location.
The result(lat,lng) is returned in the callback function or errorMessage is returned.
*/
const request = require('request');

geocodeAddress = (address, callback) => {
  request({
    url : 'http://maps.googleapis.com//maps/api/geocode/json?address=' + encodeURIComponent(address),
    json : true
  },(error,response,body) => {
    if (error) {
      callback('Unable to connect to Google Servers.');
    } else if(body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if(body.status === 'OK') {
      callback(undefined, {
        address : body.results[0].formatted_address,
        lat : body.results[0].geometry.location.lat,
        lng : body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};
