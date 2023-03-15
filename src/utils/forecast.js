const request = require('request')

const forecast = function(latitude, longitude, callback){
    const url = 'http://api.weatherstack.com/current?access_key=88b3d11d3424f104436bb9f1509db12f&query='+latitude+','+longitude+'&units=f'
    request({url: url, json: true}, function(error, response){
        if (error) {
            callback('Weather service not available! ', undefined)
        } else if(response.body.error){
            callback('Select proper location. ', undefined)
        } else {
            const temprature = response.body.current.temperature
            const rain = response.body.current.precip
            const description = response.body.current.weather_descriptions[0]
            callback(undefined, description + '. It is currently '+ temprature + ' degree fahrenheit. There is a ' + rain + '% chance of rain')
        }
    })
}

module.exports = forecast