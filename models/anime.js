// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var animeSchema = new mongoose.Schema({
    title: { type: String, index: true },
    title_en: { type: String, index: true },
    title_jp: String,
    picture: String,
    synopsis: String,
    type: { type: String, index: true },
    episodes: Number,
    tags: { type: [String], index: true },
    released: Date,
    characters: [mongoose.Schema.Types.ObjectId]
});

// Computed fields
animeSchema.virtual('season').get(function () {
    var self = this;
    var date = self.released;
    var year = date.getFullYear();
    var month = date.getMonth();
    var season;
    if(month < 3){
        season = "Winter";
    }
    else if(month < 6){
        season = "Spring";
    }
    else if(month < 9){
        season = "Summer";
    }
    else{
        season = "Fall";
    }
    return season + ' ' + year;
});

// Return model
module.exports = restful.model('Animes', animeSchema);