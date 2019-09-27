var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// Root route

router.get("/", function(req, res){
	res.render("landing", {currentUser: req.user});
});

// About- me Route

router.get("/about-me", function(req, res){
	res.render("portfolio/about-me");
});

// CV Route

router.get("/cv", function(req, res){
	res.render("portfolio/cv");
});

// ============
// AUTH ROUTES 
// ============

// show register form

router.get("/register", function(req, res){
	res.render("login/register");
});

// handle signup logic

router.post("/register", function(req, res){
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

router.get("/login", function(req, res){
	res.render("login/login");
});

// handle login logic

router.post("/login", passport.authenticate("local",
{
	successRedirect: "/",
	failureRedirect: "/login"
}), function(req, res){

});

// logout route

router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

// Middleware

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;