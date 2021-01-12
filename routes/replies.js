var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Project	= require("../models/project");
var Comment	= require("../models/comment");
var Reply	= require("../models/reply");
var middleware	= require("../public/assets/scripts/middleware");

// NEW ROUTE

router.get("/new", middleware.isLoggedIn, function(req, res){
	Project.findById(req.params.id, function(err, project){
		if(err || !project) {
			console.log(err);
		} else {
			Comment.findById(req.params.comment_id, function(err, comment){
				if(err) {
					console.log(err);
				} else {
					res.render("replies/new-reply", {comment: comment, project: project});
				}
			});
		}
	});
});

// CREATE ROUTE

router.post("/", middleware.isLoggedIn, function(req, res){
	Project.findById(req.params.id, function(err, project){
		if(err) {
			console.log(err);
		} else {

			Comment.findById(req.params.comment_id, function(err, comment){
				if(err) {
					console.log(err);
					res.redirect("/portfolio");
				} else {

					Reply.create(req.body.reply, function(err, reply){
						if(err) {
							console.log("SECOND ERROR: " + err);
						} else {
					// Add username and ID to reply
					reply.author.id = req.user._id;
					reply.author.username = req.user.username;
					reply.commentID = comment._id;
					// Save reply
					reply.save();
					comment.replies.push(reply);
					comment.save();
					req.flash("success", "Your reply has been posted!");
					res.redirect("/portfolio/" + project._id);
				}
			});
				}
			});

		}
	});
});

// EDIT ROUTE

router.get("/:reply_id/edit", middleware.checkReplyOwnership, function(req, res){
	Project.findById(req.params.id, function(err, foundProject){
		if(err || !foundProject) {
			console.log(err);
			return res.redirect("/portfolio");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err) {
				console.log(err);
				res.redirect("back");
			} else {
				Reply.findById(req.params.reply_id, function(err, foundReply){
					if(err) {
						console.log(err);
						res.redirect("back");
					} else {
						res.render("replies/edit-reply", {project: foundProject, comment: foundComment, reply: foundReply});
					}
				});
			}
		});
	});
});

// UPDATE ROUTE 

router.put("/:reply_id", middleware.checkReplyOwnership, function(req, res){
	Reply.findByIdAndUpdate(req.params.reply_id, req.body.reply, function(err, updatedReply){
		if(err) {
			res.redirect("back");
		} else {
			req.flash("success", "Your reply has been edited.");
			res.redirect("/portfolio/" + req.params.id);
		}
	});
});

// DESTROY ROUTE

router.delete("/:reply_id", middleware.checkReplyOwnership, function(req, res) {
	Project.findById(req.params.id, function(err, project) {
		if(err) {
			console.log(err);
			res.redirect("back");
		} else {
			Comment.findById(req.params.comment_id, function(err, comment){
				if(err) {
					console.log(err);
					res.redirect("back");
				} else {
					var comRep = comment.replies;
					console.log("This is Reply Array: " + comRep);
					Reply.findByIdAndRemove(req.params.reply_id, function(err, removedReply){
						if(err) {
							console.log(err);
							res.redirect("back");
						} else {

							function removeA(arr) {
								var what, a = arguments, L = a.length, ax;
								while (L > 1 && arr.length) {
									what = a[--L];
									while ((ax= arr.indexOf(what)) !== -1) {
										arr.splice(ax, 1);
									}
								}
								return arr;
							}
							
							
							var rid = removedReply._id;
							removeA(comRep, rid);
							comment.save();

							
							console.log("This is Removed Reply: " + rid);
							
							req.flash("success", "Your reply has been removed.");
							res.redirect("/portfolio/" + req.params.id);
						}
					});
				}
			});
		}
	});
});


module.exports = router;