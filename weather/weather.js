/**
 * Created by oscar on 9/06/17.
 */
const request = require('request');

const API_KEY_DARK_SKY = '287e212166ed47415997638d83d2aef7';

let getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${API_KEY_DARK_SKY}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Dark Sky server');
        }

        if (!error && response.statusCode === 200) {
            callback(undefined,
                {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                }
            );
        } else {
            callback('Unable to fetch weather');
        }
    });
};

module.exports.getWeather = getWeather;