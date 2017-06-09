/**
 * Created by oscar on 9/06/17.
 */
const yargs = require('yargs');
const axios = require('axios');

const API_KEY_DARK_SKY = '287e212166ed47415997638d83d2aef7';

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.a);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }

        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let weatherURL = `https://api.darksky.net/forecast/${API_KEY_DARK_SKY}/${lat},${lng}`;

        console.log(response.data.results[0].formatted_address);

        return axios.get(weatherURL);
    })
    .then((response) => {
        let temperature = response.data.currently.temperature;
        let apparentTemperature = response.data.currently.apparentTemperature;

        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers');
        } else {
            console.log(e.message);
        }
    });
