var express = require('express');
var router = express.Router();

var Anime = require('../models/anime');

router.param(':anime', function(req, res, next, param) {
    var id = parseInt(param);
    var query;
    if(isNaN(id)){
        query = Anime.find({
            $or: [
                { 'title': { '$regex': param, '$options': 'i' } },
                { 'title_en': { '$regex': param, '$options': 'i' } }
            ]
        });
    }
    else{
        query = Anime.findOne({ 'id': id });
    }
    
    query.exec(function (err, model) {
        req.model = model;
        next();
    });
});

router.get('/:anime', function(req, res) {
    res.send(req.model);
});

module.exports = router;