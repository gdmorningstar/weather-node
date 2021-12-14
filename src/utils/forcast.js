const request = require('request');
// //weather stack
// // api key: d6e2251cb16b336d389e8463f2337923

const forcast = (lat,long, callback) => {
    const url =`http://api.weatherstack.com/current?access_key=d6e2251cb16b336d389e8463f2337923&query=${lat},${long}&units=f`;
    request({url, json: true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect.');
        } else if(body.error) {
            callback('unable to find location.');
        }else {
            const degrees = body.current.temperature;
            const feelslike = body.current.feelslike;
            const description = body.current.weather_descriptions[0];
            callback(undefined,`It is currently ${description}, ${degrees} degrees, and it feels like ${feelslike} degrees.`);
        }
    });
}

module.exports = forcast;