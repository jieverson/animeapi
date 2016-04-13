var page = require('webpage').create();

page.open('https://github.com/jieverson/animeapi', function(status) {
    var title = page.evaluate(function() {
        return document.title;
    });
    console.log(title);
    phantom.exit();
});