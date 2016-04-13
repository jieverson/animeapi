// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Anime = require('../models/anime');
var Character = require('../models/character');

// Routes
Anime.methods(['get']);
Anime.register(router, '/animes');

Character.methods(['get']);
Character.register(router, '/characters');

// Return router
module.exports = router;