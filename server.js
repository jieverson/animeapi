// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB
mongoose.connect('mongodb://localhost/animeapi');

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api.js'));

app.get('/', function(req, res) {
    res.send('working');    
});

// Start server
app.listen(3000);
console.log('API is runing on port 3000');