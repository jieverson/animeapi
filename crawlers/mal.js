function getCharacters(page) {
    console.log(page.url);
    
    /*page.onConsoleMessage = function(msg) {
        console.log("> " + msg);
    };*/
    
    var characters = page.evaluate(function() {
        var ids = [];
        
        var tds = document.querySelectorAll('td.borderClass');
        for(var i in tds){
            var td = tds[i];
            
            if(typeof(td) !== 'object'){
                continue;
            }
            
            var a = td.querySelector('a[href]');
            if(a && a.href.search('http://myanimelist.net/character/') >= 0){
                var id = parseInt(a.href.split('/')[4]);
                ids.push(id);
            }
            else{
                continue;
            }
        }
        
        return ids;
    });
    
    return characters;
}

function download(page, callback){
    /*page.onConsoleMessage = function(msg) {
        console.log("> " + msg);
    };*/
    
    var data = page.evaluate(function() {
        var id = document.URL.split('/')[4];
        var img = document.querySelector('img[itemprop="image"]');
        var picture = img ? img.src : null;
        var title = document.querySelector('span[itemprop="name"]').innerText;
        var descriptionSpan = document.querySelector('span[itemprop="description"]');
        var synopsis = descriptionSpan ? descriptionSpan.innerText : null;
        var type = document.querySelector('span.information.type').innerText;
        var episodes = parseInt(document.getElementById('curEps').innerText);
        
        var title_en;
        var title_jp;
        var titles = document.querySelectorAll('div.spaceit_pad');
        for(var ti in titles) {
            var t = titles[ti];
            if(t.innerText){
                var ts = t.innerText.split(' ');
                if(ts[0] == "English:"){
                    title_en = t.innerHTML.split('</span>')[1].trim();
                }
                if(ts[0] == "Japanese:"){
                    title_jp = t.innerHTML.split('</span>')[1].trim();
                }
                if(title_en && title_jp){
                    break;
                }
            }
        }
        
        var released;
        var divs = document.querySelectorAll('div.spaceit');
        for(var di in divs){
            var d = divs[di];
            var ds = d.innerText.split(' ');
            if(ds[0] == "Aired:"){
                var aired = d.innerHTML.split('</span>')[1].trim();
                released = new Date(aired.split('to')[0]);
                if (isNaN(released.getTime())){
                    released = null;
                }
                break;
            }
        }
        
        var tags = [];
        var links = document.querySelectorAll('a[href][title]');
        for(var li in links){
            var uri = links[li].href;
            if(uri && uri.search('/anime/genre/') >= 0){
                var ls = uri.split('/');
                var tag = ls[ls.length - 1].toLowerCase();
                tags.push(tag);
            }
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
        return anime;
    });
    var characters_url = page.url + '/characters';
    page.close();
    
    page = require('webpage').create();
    page.open(characters_url, function(){
        var characters = getCharacters(page);
        data.characters = characters;
        page.close();
        
        var json = JSON.stringify(data, null, 4);
    
        var fs = require('fs');
        fs.write('../data/animes/' + data.id + '.json', json, 'w');
        
        callback();
    });
}

function getAnime(links, index){
    if(index < links.length){
        var link = links[index];
        console.log('Anime: ' + (_index + index));
        console.log(link);
        
        var page = require('webpage').create();
        
        page.open(link, function(){
            download(page, function() {                
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
    var page = require('webpage').create();
    
    page.open('http://myanimelist.net/topanime.php?limit=' + i, function(status){
        if(status === "success") {
            console.log('Page: ' + i);
            var links = page.evaluate(function() {
                var a_list = document.querySelectorAll('a.hoverinfo_trigger');
                var links = [];
                for(var i = 0; i < a_list.length; i += 2){
                    links.push(a_list[i].href);
                }
                return links;
            });
            
            page.close();
            getAnime(links, 0);
        }
        else{
            console.log('EXIT!');
            phantom.exit();
        }
    });
}

var _index = 0;
var PAGE_SIZE = 50;
paginator(_index);