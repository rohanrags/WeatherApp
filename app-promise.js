/*
Main function to create the weather app.

1. Get arguments from command line using yargs. (-a and --address)
2. Use Axios library to make request and return results.
*/


const yargs = require('yargs');
const axios = require('axios');

//Get arguments from command line using yargs. (-a and --address)
const argv = yargs
.options({
  a : {
    demand : true,
    describe : 'Address to fetch weather for',
    alias : 'address',
    string : true
  }
})
.help()
.alias('help','h')
.argv;

var encodedURL = 'http://maps.googleapis.com//maps/api/geocode/json?address=' + encodeURIComponent(argv.a);
axios.get(encodedURL).then((response)=>{
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  var address = response.data.results[0].formatted_address;
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  console.log(address);
  var encodedWeatherURL = `https://api.darksky.net/forecast/39692290828c7d0a5a5cc66a580c26d0/${lat},${lng}`;
  return axios.get(encodedWeatherURL);
}).then((response)=>{
  var temp = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It is currently ${temp}, but feels like ${apparentTemperature}`);
})
.catch((e)=>{
  if(e.code === 'ENOTFOUND') {
    console.log('Unable to connect to servers.');
  } else {
    console.log(e.message);
  }
});
