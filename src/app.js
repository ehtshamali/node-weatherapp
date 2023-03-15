const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require ('express')
const hbs = require('hbs')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', function(req, res){
    res.render('index', {
        title: 'This is data coming from render view',
        name: 'Ehtasham'
    })
})

app.get('/help', function(req, res){
    res.render('help', {
        message: 'This is a help message for you to help yourself.',
        title: 'Help Page'
    })
})

// app.get('', function(req, res){
//     res.send('<h1>Hello express</h1>')
// })

// app.get('/help', function(req, res){
//     res.send('<h1>Help Page</h1>')
// })

app.get('/about', function(req, res){
    res.send({
        Name: 'Ehtasham',
        Age: 28
    })
})

app.get('/contact', function(req, res){
    res.send([{
        Phone: 6791519
    }, {
        Office: 99045000 
    }])
})

app.get('/weather', function(req, res){
    if(!req.query.address) {
        return res.send({
            error: 'Kindly provide Address for forecast.'
        })
    }
    geocode(req.query.address, function(error, response){
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(response.latitude, response.longitude, function(forecastError, forecastResponse){
            if(forecastError){
                return res.send({
                    error: forecastError
                })
            }
            res.send({
                forecast: forecastResponse,
                location: response.place
            })
        })
    })
    // res.send({
    //     forecast: 'Its getting hot day by day',
    //     location: req.query.address
    // })
})

app.get('/product', function(req, res){
    // console.log(req.query)
    if (!req.query.search){
        return res.send({
            error: 'No search result found'
        })
    }
    res.send({
        product: []
    })
})

app.get('*', function(req, res){
    res.render('404', {
        title: 'This is 404 Page',
        message: 'The page you looking for not exist.'
    })
})

app.listen(3000, function(){
    console.log('Server is up')
})