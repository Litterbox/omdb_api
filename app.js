var express = require("express");
var http = require("http");
var request = require("request");
var app = express();

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function (req, res) {
    var term = req.query.search_term;
    var url = "http://www.omdbapi.com/?s=" + term;

    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("results.ejs", {movieList: data.Search});
        }
    });
});


app.listen(3000);
