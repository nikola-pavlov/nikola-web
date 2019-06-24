var express 			= require("express"),
	app 				= express(),
	mongoose 			= require("mongoose"),
	bodyParser 			= require("body-parser"),
	Message 			= require("./models/message")

mongoose.connect("mongodb://localhost/portfolio_web");

// Message.create({
// 	message: "Starting data for testing",
// 	name: "Mile Panika",
// 	email: "mile@panika.com"
// }, function(err, message) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED MESSAGE");
// 		console.log(message)
// 	}
// });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/grid-test", function(req, res){
	res.render("grid-test");
});

app.get("/contact", function(req, res){
	res.render("messages/contact");
});

app.get("/inbox", function(req, res){
	Message.find({}, function(err, allMessages){
		if(err) {
			console.log(err);
		} else {
			res.render("messages/inbox", {messages: allMessages});
		}
	});
});

app.post("/contact", function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;
	var newMessage = {name: name, email: email, message: message};
	console.log(newMessage);
	Message.create(newMessage, function(err, newCreatedMessage){
		if(err) {
			console.log(err);
		} else {
			console.log(newCreatedMessage);
			res.redirect("/contact");
		}
	});
});

app.listen(80, "192.168.0.20", function(){
	console.log("Server started...");
});