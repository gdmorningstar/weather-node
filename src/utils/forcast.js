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
            const wind = body.current.wind_dir;
            // the directions dictionary and the getDirct function can probably be moved outside of this else block. leaving it for now.
            const directions = {
                "N":"north",
                "S":"south",
                "E":"east",
                "W":"west"
            };
            
            function getDirect(windDirect,directions){
                for ([key, value] of Object.entries(directions)){
                    if (key == windDirect){
                        return value
                    }
                }
            };

            callback(undefined,`It is currently ${description}, ${degrees} degrees, and it feels like ${feelslike} degrees. The wind is currently comming from the ${getDirect(wind,directions)}.`);
        }
    });
}

module.exports = forcast;