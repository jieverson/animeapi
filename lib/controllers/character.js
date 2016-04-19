var express = require('express');
var router = express.Router();

var Character = require('../models/character');

router.get('/', function(req, res) {
    res.send("TODO");
});

module.exports = router;