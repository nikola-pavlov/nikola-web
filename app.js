var express 			= require("express"),
app 				= express(),
mongoose 			= require("mongoose"),
bodyParser 			= require("body-parser"),
dotenv 				= require('dotenv').config(),
flash				= require("connect-flash"),
passport			= require("passport"),
LocalStrategy 		= require("passport-local"),
methodOverride		= require("method-override"),
Message 			= require("./models/message"),
User				= require("./models/user"),
Project				= require("./models/project"),
Comment 			= require("./models/comment"),
Reply 				= require("./models/reply"),
Photo				= require("./models/photo"),
seedDB				= require("./seeds"),
moment 				= require('moment')

// Requiring Routes

var commentRoutes 	= require("./routes/comments"),
	projectRoutes	= require("./routes/projects"),
	contactRoutes	= require("./routes/contact"),
	indexRoutes		= require("./routes/index"),
	replyRoutes		= require("./routes/replies"),
	userRoutes		= require("./routes/users"),
	photoRoutes		= require("./routes/photos")

// MongoDB Connect

mongoose.connect("mongodb://localhost/portfolio_web");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

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
	res.locals.flash_error = req.flash("error");
	res.locals.flash_success = req.flash("success");
	res.locals.currentURL = req.protocol + '://' + req.get('host') + req.originalUrl;
	res.locals.moment = moment;
	next();
});

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/portfolio", projectRoutes);
app.use("/portfolio/:id/comments", commentRoutes);
app.use("/portfolio/:id/comments/:comment_id/replies", replyRoutes);
app.use("/portfolio/:id/photos", photoRoutes);
app.use(contactRoutes);

app.listen(80, "192.168.0.20", function(){
	console.log("Server started...");
});