// Dependencies
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send("A RESTful API for Anime Data.");
});

// Models
/*
var Anime = require('../models/anime');
Anime.methods(['get']);
Anime.register(router, '/animes');

var Character = require('../models/character');
Character.methods(['get']);
Character.register(router, '/characters');
*/

// Controllers
var animeController = require('../controllers/anime');
router.use('/anime', animeController);

var characterController = require('../controllers/character');
router.use('/character', characterController);

var seasonController = require('../controllers/season');
router.use('/season', seasonController);

// Return router
module.exports = router;