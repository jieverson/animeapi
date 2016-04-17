var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

url = 'http://myanimelist.net/character/3105/Shiki_Ryougi';
request(url, function(error, response, html){
    if(!error){
        console.log('hey');
        var $ = cheerio.load(html);
        var h1 = $('h1.h1')[0];
        var name = $(h1).children().first();
        console.log(name);
    }
});