/*
Main function to create the weather app.

1. Get arguments from command line using yargs. (-a and --address)
2. Use geocode.js to fetch the lat and lng values of a location.
3. Use weather.js to fetch the temperature of the location.
*/


const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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


//Weather App with Callback function.

//call geocode function with callback function
geocode.geocodeAddress(argv.a, (errorMessage,geocodeResults) => {
  if(errorMessage) {
    console.log('Unable to fetch address.');
  } else {
    console.log(geocodeResults.address);
    //call weather function with callback function
    weather.getWeather(geocodeResults.lat,geocodeResults.lng, (errorMessage,weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It is currently ${weatherResults.temp}, but feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
