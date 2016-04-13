// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var characterSchema = new mongoose.Schema({
    name: { type: String, index: true },
    name_jp: String,
    picture: String,
    about: String,
    age: Number,
    birthdate: Date,
    height: Number,
    weight: Number
});

// Return model
module.exports = restful.model('Characters', characterSchema);