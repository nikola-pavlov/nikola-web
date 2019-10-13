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
		if(err) {
			req.flash("error", "Something went wrong.");
			res.redirect("back");
		} else {
			console.log(foundUser);
			res.render("login/show-user", {user: foundUser});
		}
	});
});

// EDIT ROUTE




module.exports = router;