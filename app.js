var express 			= require("express"),
app 				= express(),
mongoose 			= require("mongoose"),
bodyParser 			= require("body-parser"),
passport			= require("passport"),
LocalStrategy 		= require("passport-local"),
Message 			= require("./models/message"),
User				= require("./models/user"),
Project				= require("./models/project")

mongoose.connect("mongodb://localhost/portfolio_web");

// Project.create({
// 	name: "Starting data for testing",
// 	description: "Mile Panika",
// 	category: "mile@panika.com",
// 	date: "17/09/2019",
// 	image: "Image"
// }, function(err, project) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED MESSAGE");
// 		console.log(project)
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

app.get("/about-me", function(req, res){
	res.render("portfolio/about-me");
});

app.get("/cv", function(req, res){
	res.render("portfolio/cv");
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

// portfolio routes

// var projects = [
// 	{name: "Travel Flyer", image: "https://pixabay.com/get/5ee4dc4b4857b108f5d084609620367d1c3ed9e04e50744f7d2878dd904cc2_340.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. nobis cumque molestias."},
// 	{name: "Book Branding", image: "https://pixabay.com/get/55e2d2464f5ba814f6da8c7dda793f7f1636dfe2564c704c73277cd79e4ac45f_340.jpg", description: "Reprehenderit architecto odit consequuntur voluptas earum nulla magni nostrum. Hic ducimus, in ipsum."},
// 	{name: "Catalogue Design", image: "https://pixabay.com/get/54e3d7464c50ab14f6da8c7dda793f7f1636dfe2564c704c73277cd79e4ac45f_340.jpg", description: "Vero facere, ullam blanditiis nostrum quod, autem atque incidunt animi nobis..."},
// 	{name: "Amazing Webpage", image: "https://pixabay.com/get/54e0d54b4c56b108f5d084609620367d1c3ed9e04e50744f7d2878dd904cc2_340.jpg", description: "Itaque provident tenetur delectus consequatur quod maxime, perspiciatis quaerat doloremque culpa?"}

// 	];

app.get("/portfolio", function(req, res){
	// Get all projects from DB
	Project.find({}, function(err, allProjects) {
		if(err) {
			console.log(err); 
		} else {
			res.render("portfolio/portfolio", {projects:allProjects});
		}
	});
});

app.post("/portfolio", function(req, res) {

	//get data from form and add to projects array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var category = req.body.category;
	var date = req.body.date;
	var newProject = {name: name, image: image, description: description, category: category, date: date};
	
	// Create a new project and save to DB
	Project.create(newProject, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			//redirect back to portfolio page
			res.redirect("/portfolio");
		}
	});
});

app.get("/portfolio/new", function(req, res) {
	res.render("portfolio/new-project.ejs");
});

app.listen(80, "192.168.0.20", function(){
	console.log("Server started...");
});