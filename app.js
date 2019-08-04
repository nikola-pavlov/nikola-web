var express 			= require("express"),
	app 				= express(),
	mongoose 			= require("mongoose"),
	bodyParser 			= require("body-parser"),
	passport			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	Message 			= require("./models/message"),
	User				= require("./models/user")

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

// PASSPORT CONFIGURATION 

app.use(require("express-session")({
	secret: "On je Nole svi ga vole!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.get("/", function(req, res){
	res.render("landing", {currentUser: req.user});
});

app.get("/grid-test", function(req, res){
	res.render("grid-test");
});

app.get("/contact", function(req, res){
	res.render("messages/contact");
});

app.get("/inbox", isLoggedIn, function(req, res){
	Message.find({}, function(err, allMessages){
		if(err) {
			console.log(err);
		} else {
			res.render("messages/inbox", {messages: allMessages});
		}
	});
});

app.post("/contact", function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
	var newMessage = {firstName: firstName, lastName: lastName, email: email, subject: subject, message: message};
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

// ============
// AUTH ROUTES 
// ============

// show register form

app.get("/register", function(req, res){
	res.render("login/register");
});

// handle signup logic

app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			console.log(err);
			return res.render("login/register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/");
			console.log(user);
		});
	});
});

// show login form

app.get("/login", function(req, res){
	res.render("login/login");
});

// handle login logic

app.post("/login", passport.authenticate("local",
	{
		successRedirect: "/",
		failureRedirect: "/login"
	}), function(req, res){

});

// logout route

app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkPassword(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(80, "192.168.0.20", function(){
	console.log("Server started...");
});