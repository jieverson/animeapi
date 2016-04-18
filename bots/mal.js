var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var root = "../";

function download(uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)); //.on('close', callback);
    });
}

function getCharInfo(id) {
    request('http://myanimelist.net/character/' + id, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            
            var name = $('.normal_header[style]')[0].children[0].data.trim();
            var name_jp = $('.normal_header span small')[0].children[0].data.replace('(','').replace(')','');
            var picture = $('a > img[alt]')[0].attribs.src;
            if(picture.search('/images/characters/') < 0){
                picture = null;
            }
            
            //TODO!
        }
    });
}

function save(anime) {
    var json = JSON.stringify(anime, null, 4);  
    fs.writeFile(root + 'data/animes/' + anime.id + '.json', json);    
}

function getCharacters(html) {
    var $ = cheerio.load(html);
    
    var ids = [];
    
    var uris = $('td.borderClass > a[href]');
    for(var i in uris){
        var a = uris[i];
        
        if(a && a.attribs && a.attribs.href && a.attribs.href.search('/character/') === 0){
            var id = parseInt(a.attribs.href.split('/')[2]);
            //TODO: getCharInfo(id);
            ids.push(id);
        }
    }
    
    return ids;
}

function getAnime(links, index){
    if(index < links.length){
        var link = links[index];
        console.log('Anime: ' + (_index + index));
        console.log(link);
        
        request(link, function(error, response, html){
            var $ = cheerio.load(html);
            
            var id = parseInt(link.split('/')[4]);
            var img = $('img[itemprop="image"]');
            var picture = img.length > 0 ? img[0].attribs.src : null;
            var title = $('span[itemprop="name"]')[0].children[0].data;
            var descriptionSpan = $('span[itemprop="description"]');
            var synopsis = descriptionSpan.length > 0 ? descriptionSpan[0].children[0].data : null;
            var type = $('span.information.type')[0].children[0].children[0].data;
            var episodes = parseInt($('#curEps')[0].children[0].data);
            
            var title_en = null;
            var title_jp = null;
            var titles = $('div.spaceit_pad');
            for(var ti in titles) {
                var t = titles[ti];
                if(t.children && t.children.length === 3){
                    var ts = t.children[1].children[0].data;
                    if(ts === "English:"){
                        title_en = t.children[2].data.trim();
                    }
                    if(ts === "Japanese:"){
                        title_jp = t.children[2].data.trim();
                    }
                    if(title_en && title_jp){
                        break;
                    }
                }
            }
            
            var released = null;
            var divs = $('div.spaceit');
            for(var di in divs){
                var d = divs[di];
                if(d.children[1].children[0].data === "Aired:"){
                    var aired = d.children[2].data.trim();
                    released = new Date(aired.split('to')[0]);
                    if (isNaN(released.getTime())){
                        released = null;
                    }
                    break;
                }
            }
            
            var tags = [];
            var tag_links = $('a[href][title]');
            for(var li in tag_links){
                if(tag_links[li].attribs){
                    var uri = tag_links[li].attribs.href;
                    if(uri && uri.search('/anime/genre/') >= 0){
                        var ls = uri.split('/');
                        var tag = ls[ls.length - 1].toLowerCase();
                        tags.push(tag);
                    }
                }
                else{
                    break;
                }
            }
            
            if(picture){
                download(picture, root + 'images/animes/' + id + '.png');
            }
            
            var anime = {
                id: id,
                title: title,
                title_en: title_en,
                title_jp: title_jp,
                picture: picture,
                synopsis: synopsis,
                type: type,
                episodes: episodes,
                tags: tags,
                released: released,
                characters: []
            };
            
            var characters_url = response.request.href + '/characters';
            
            request(characters_url, function(error, response, html){
                console.log(characters_url);
                var characters = getCharacters(html);
                anime.characters = characters;
                
                save(anime);
                
                getAnime(links, index + 1);
            });
        });
    }
    else{
        _index += PAGE_SIZE;
        paginator(_index);
    }
}

function paginator(i){
    console.log('Page: ' + i);
    request('http://myanimelist.net/topanime.php?limit=' + i, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var a_list = $('a.hoverinfo_trigger');
            
            var links = [];
            for(var i = 0; i < a_list.length; i += 2){
                var p_url = a_list[i].attribs.href;
                links.push(p_url);
            }
            
            getAnime(links, 0);
        }
        else{
            console.log('EXIT!');
        }
    });
}

var _index = 0;
var PAGE_SIZE = 50;
paginator(_index);

//TODO: Check it.
//getCharInfo(3105);