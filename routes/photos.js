var express = require("express");
var router = express.Router({mergeParams: true});
var Project	= require("../models/project");
var Comment	= require("../models/comment");
var Reply	= require("../models/reply");
var User	= require("../models/user");
var Photo	= require("../models/photo");
var middleware	= require("../public/assets/scripts/middleware");


// NEW ROUTE

router.get("/new", middleware.isAdmin, function(req, res){
	console.log("THIS IS REQ.PARAMS.ID: " + req.params.id);
	// find project by id
	Project.findById(req.params.id, function(err, project){
		if(err || !project) {
			req.flash("error", "Project not found.");
			res.redirect("/portfolio");
		} else {
			console.log(project);
			res.render("photos/new-photo", {project: project});
		}
	});
});

// CREATE ROUTE

router.post("/", function(req, res){
	Project.findById(req.params.id, function(err, project){
		if(err) {
			req.flash("error", "Project not found.");
			res.redirect("/portfolio");
		} else {
			Photo.create(req.body.photo, function(err, photo){
				if(err) {
					req.flash("error", "Error: Something went wrong. Photo not created.");
					res.redirect("/portfolio");
				} else {
					photo.projectID = project._id;
					photo.save();
					project.photos.push(photo);
					project.save();
					req.flash("success", "Photo created.");
					res.redirect("/portfolio/" + project._id);
				}
			});
		}
	});
});

// EDIT ROUTE

router.get("/:photo_id/edit", middleware.isAdmin, function(req, res){
	Project.findById(req.params.id, function(err, foundProject){
		if(err || !foundProject) {
			req.flash("error", "Error: Project not found.");
			return res.redirect("/portfolio");
		}
		Photo.findById(req.params.photo_id, function(err, foundPhoto){
			if(err) {
				res.redirect("back");
			} else {
				res.render("photos/edit-photo", {project: foundProject, photo: foundPhoto});
			}
		});
	});
});

// UPDATE ROUTE 

router.put("/:photo_id", middleware.isAdmin, function(req, res){
	Photo.findByIdAndUpdate(req.params.photo_id, req.body.photo, function(err, updatedPhoto){
		if(err) {
			req.flash("error", "Error: Photo not edited");
			return res.redirect("back");
		} 
		req.flash("success", "Your photo has been edited.");
		res.redirect("/portfolio/" + req.params.id);
	});
});

// DESTROY ROUTE

router.delete("/:photo_id", middleware.isAdmin, function(req, res){
	// Photo.findByIdAndRemove(req.params.photo_id, function(err){
	// 	if(err) {
	// 		req.flash("error", "Error: Photo not deleted");
	// 		return res.redirect("back");
	// 	}
	// 	req.flash("success", "Your photo has been deleted.");
	// 	res.redirect("/portfolio/" + req.params.id);
	// });

	Project.findById(req.params.id, function(err, project){
		if(err) {
			console.log(err);
			res.redirect("back");
		} else {
			Photo.findByIdAndRemove(req.params.photo_id, function(err, photo){
				if(err) {
					console.log(err);
					res.redirect("back");
				} else {
					var pid = photo._id;

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

					var proPho = project.photos;
					removeA(proPho, pid);
					project.save();
					req.flash("success", "Your photo has been removed.");
					res.redirect("/portfolio/" + req.params.id);
				}
			});
		}
	});
});





module.exports = router;