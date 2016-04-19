var mongoose = require('mongoose');

var connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost/animeapi';
mongoose.connect(connectionString);
var Anime = require('../lib/models/anime');

Anime.remove({}, function(params) {
   console.log('done'); 
});