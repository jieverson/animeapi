// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB
var connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost/animeapi';
mongoose.connect(connectionString);

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api.js'));

app.get('/', function(req, res) {
    res.redirect('https://github.com/jieverson/animeapi#readme');
});

// Start server
var port = process.env.SERVER_PORT || 3000;
app.listen(port);
console.log('API is runing on port ' + port);