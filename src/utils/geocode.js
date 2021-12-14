const request = require('request');

//map box
//api key: pk.eyJ1IjoiZ2FiZW1vcmluZ3N0YXIiLCJhIjoiY2t3MnI3cmxhNjFpNTJ1bXR0ajMzZXF4aCJ9.ASuEOmIsPuDCOC3wN9S31w
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiZ2FiZW1vcmluZ3N0YXIiLCJhIjoiY2t3MnI3cmxhNjFpNTJ1bXR0ajMzZXF4aCJ9.ASuEOmIsPuDCOC3wN9S31w&limit=1';
    request({url,json:true}, (error,{body})=>{
        if (error){
            callback('unable to connect to location services', undefined);
        }else if (body.features.length === 0) {
            callback('unable to find location, try a diffrent search',undefined);
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;