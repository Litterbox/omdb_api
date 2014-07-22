var express = require("express");
var http = require("http");
var app = express();

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function (req, res) {
    var term = req.query.search_term;
    var url = "http://www.omdbapi.com/?s=" + term;

    http.get(url, function(response) {
        var output = "";
        response.on("data", function (chunk) {
            output += chunk;
        });
        response.on("end", function () {
            var obj = JSON.parse(output);
            res.send(obj);
        });
    }).on('error', function(e) {
        res.send("error for: " + url);
    });
});


app.listen(3000);
