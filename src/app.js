const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 8000;

//define paths for express config
const publicDirPath = path.join(__dirname,  '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // by default it looks in src/views directory
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        'title':'Weather',
        'name': 'Fetch weather data'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About',
        'body': 'About body',
        'name': 'Yogesh'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'helpText': 'Help text',
        'name': 'Yogesh'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            Error: 'Please provide an address'
        })
    }
    console.log('req.query.address', req.query.address);
    geocode(req.query.address, (error, data) => {

        if (error) {
            return res.send({'geocode error' :error});
        }
        // console.log('data', data);

        // forecast(37.8267, -122.4233, (error, data) => {
        forecast(data.latitude, data.longitude, (error, data) => {
            if (error) {
                return res.send({'forecast error': error});
            }
            res.send({'Location': data.location.name + ', ' + data.location.region,
                        'Forecast': data.current.weather_descriptions});
        });
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if(!req.query.search) {
        return res.send('Error: Please provide search');
    }
    res.send({  
        products:[]
    });
});

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404',
        text: 'Help page not found',
        name: 'Yogesh'
    });
});

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        text: 'Page not found',
        name: 'Yogesh'
    });
})

app.listen(port, () => {
    console.log('server started on '+port);
});