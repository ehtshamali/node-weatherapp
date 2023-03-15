const request =require('request')

const geocode = function (address, callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZWh0YXNoYW1hbGkiLCJhIjoiY2xkdXAyNDJtMDgwcDNwcmZua3U5b2U3cyJ9.9U3EOZJEk1zwZi81HZD12g&limit=1'
    request({url: url, json: true}, function(error, response){
        if (error) {
            callback('Geo Location not available now!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Select correct location!', undefined)
        } else{
            callback(undefined,{
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                place : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode