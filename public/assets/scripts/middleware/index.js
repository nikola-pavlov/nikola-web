var Project	= require("../../../../models/project");
var Comment	= require("../../../../models/comment");
var Message = require("../../../../models/message");

// ALL MIDDLEWARE GOES HERE
var middlewareObj = {};

middlewareObj.checkProjectOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Project.findById(req.params.id, function(err, foundProject) {
			if(err || !foundProject) {
				req.flash("error", "Error: Project not found.");
				res.redirect("back");
			} else {
				// Does User own the project?
				if(foundProject.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "Error: Permission denied");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err || !foundComment) {
				req.flash("error", "Comment not found");
				res.redirect("/portfolio");
			} else {
				// Does User own the comment?
				if(foundComment.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "Error: Permission denied");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
}

module.exports = middlewareObj;