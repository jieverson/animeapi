var express = require('express');
var router = express.Router();

var Anime = require('../models/anime');

router.param(':year', function(req, res, next, param) {
    req.year = param;
    next();
});

router.param(':season', function(req, res, next, param) {
    req.season = param;
    next();
});

var getSeason = function(req, res){
    var month;
    switch(req.season){
        case 'winter':
            month = 0;
            break;
        case 'spring':
            month = 3;
            break;
        case 'summer':
            month = 6;
            break;
        case 'fall':
            month = 9;
            break;
        default:
            break;
    }
    
    var start = new Date(req.year, month, 1);
    var end = new Date(req.year, month + 4, 0);
    
    var query = Anime.find({'released': {$gte: start, $lt: end}});
    
    query.exec(function (err, model) {
        res.send(model);
    });
};

router.get('/:year/:season', getSeason);

router.get('/', function(req, res) {
    var now = new Date();
    var month = now.getMonth();
    var season;
    if(month < 3){
        season = "winter";
    }
    else if(month < 6){
        season = "spring";
    }
    else if(month < 9){
        season = "summer";
    }
    else{
        season = "fall";
    }
    req.year = now.getFullYear();
    req.season = season;
    getSeason(req, res);
});

module.exports = router;