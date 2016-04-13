// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var animeSchema = new mongoose.Schema({
    name: String
});

// Return model
module.exports = restful.model('Animes', animeSchema);