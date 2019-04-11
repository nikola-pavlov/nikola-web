var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/grid-test", function(req, res){
	res.render("grid-test");
});

app.listen(80, "192.168.0.20", function(){
	console.log("Server started...");
});