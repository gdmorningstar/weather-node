const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { text } = require('express')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const { error } = require('console')

const app = express()
const port = process.env.PORT || 3000

// defins paths for express config
const pubPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// handle bars config
app.set('views',viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// static directory for server
app.use(express.static(pubPath))


app.get('', (req, res) =>{
    res.render('index', {
      title: 'Weather App',
      name: 'Gabriel M.'  
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
      title: 'About the Weather App',
      text: 'This weather app can be used to display the current weather in your area.',
      name: 'Gabriel M.',
      img: 'img/1.png'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
      title: 'Help with the Weather App',
      text: 'To search for weather in your location, enter it into the search bar bellow and press enter.',
      name: 'Gabriel M.',
      img: 'img/1.png'
    })
})

app.get('/weather',(req, res) =>{
  if (!req.query.location){
    return res.send({
      error: 'You must provied a location.'
    })
  }
  geocode(req.query.location,(error,{latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    forcast(latitude,longitude, (error, forcastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        forcast: forcastData,
        location,
        address: req.query.location
      })
    })
  })  
})

app.get('/help/*',(req, res) =>{
  res.render('404',{
    title: '404 help page not found dude.',
    text: 'No help there, dude. Gana have to try again, bro.'
  })
})

app.get('*',(req, res) =>{
  res.render('404',{
    title: '404 no page found, dude.',
    text: 'No page found there, dude. Gana have try that one again, bro.'
  })
})

app.listen(port, ()=>{
    console.log('Server is up on port' + port)
})