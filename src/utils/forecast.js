const request = require('request');
// const chalk = require('chalk');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=380966d98e6e588a3751bc887c60225c&query=' + latitude + ',' + longitude;
    // console.log(chalk.yellow('Waiting for response of '+latitude));
    const options = { url, json: true };
    request(options, (error, response) => {
        if (error) {
            callback('unable to connect');
        } else if (response.body.error) {
            callback('unabel to find location');
        } else {
            callback(undefined, response.body);
        }
    });
}

module.exports = forecast;