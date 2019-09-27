var express 			= require("express"),
app 				= express(),
mongoose 			= require("mongoose"),
bodyParser 			= require("body-parser"),
passport			= require("passport"),
LocalStrategy 		= require("passport-local"),
methodOverride		= require("method-override"),
Message 			= require("./models/message"),
User				= require("./models/user"),
Project				= require("./models/project"),
Comment 			= require("./models/comment"),
seedDB				= require("./seeds")

// Requiring Routes

var commentRoutes 	= require("./routes/comments"),
	projectRoutes	= require("./routes/projects"),
	contactRoutes	= require("./routes/contact"),
	indexRoutes		= require("./routes/index")

// MongoDB Connect

mongoose.connect("mongodb://localhost/portfolio_web");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

// Seed the DB
// seedDB();

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

app.use("/", indexRoutes);
app.use("/portfolio", projectRoutes);
app.use("/portfolio/:id/comments", commentRoutes);
app.use(contactRoutes);

app.listen(80, "192.168.0.20", function(){
	console.log("Server started...");
});