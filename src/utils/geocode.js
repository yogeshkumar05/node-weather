const request = require('request');
// const chalk = require('chalk');

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieW9nZXNoa3VtYXIwNSIsImEiOiJja2RxcG15Nm8xOGJ6MnJta3B1MTlxdzMzIn0.3R4vxGV7VGyKXOKVWupPiw&limit=1';
    // console.log('Fetching current weather summary of '+address+'....');
    request({url, json:true}, (error, response) => {
        // console.log(chalk.yellow('Received response: '));
        if(error) {
            callback('unable to connect');
        } else if(response.body.features.length === 0) {
            callback('unabel to find location');
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name

            })
        }
    });
}

module.exports = geocode;