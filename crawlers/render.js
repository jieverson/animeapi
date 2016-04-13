var page = require('webpage').create();

page.open('https://github.com/jieverson/animeapi', function(status) {
    console.log("Status: " + status);
    if(status === "success") {
        page.render('example.png');
    }
    phantom.exit();
});