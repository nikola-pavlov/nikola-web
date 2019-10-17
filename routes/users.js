var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Project	= require("../models/project");
var Comment	= require("../models/comment");
var Reply	= require("../models/reply");
var User	= require("../models/user");
var middleware	= require("../public/assets/scripts/middleware");


// SHOW ROUTE

router.get("/:user_id", function(req, res){
	User.findById(req.params.user_id, function(err, foundUser){
		if(err || !foundUser) {
			req.flash("error", "Error: User not found.");
			res.redirect("back");
		} else {
			console.log(foundUser);
			res.render("login/show-user", {user: foundUser});
		}
	});
});

// EDIT ROUTE

router.get("/:user_id/edit", middleware.checkUserOwnership, function(req, res){
	User.findById(req.params.user_id, function(err, foundUser){
		if(err) {
			req.flash("error", "Error: User not found.");
			res.redirect("back");
		} else {
			res.render("login/edit-user", {user: foundUser});
		}
	});
});

// UPDATE ROUTE
router.put("/:user_id", middleware.checkUserOwnership, function(req, res){
	User.findByIdAndUpdate(req.params.user_id, req.body.user, function(err, updatedUser){
		if(err) {
			req.flash("error", "Error: User not found.");
			res.redirect("back");
		} else {
			req.flash("success", "Your user has been edited.");
			res.redirect("/users/" + req.params.user_id);
		}
	});
});

// DELETE ROUTE

router.delete("/:user_id", middleware.checkUserOwnership, function(req, res){
	User.findByIdAndRemove(req.params.user_id, function(err, removedUser){
		if(err) {
			console.log(err);
			res.redirect("back");
		} else {
			req.logout();
			req.flash("success", "User was removed.");
			res.redirect("/");
		}
	});
});




module.exports = router;