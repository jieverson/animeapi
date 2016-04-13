// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Anime = require('../models/anime');

// Routes
Anime.methods(['get']);
Anime.register(router, '/animes');

// Return router
module.exports = router;