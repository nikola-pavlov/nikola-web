var express = require("express");
var router = express.Router();
var Project	= require("../models/project");
var Comment	= require("../models/comment");
var Reply	= require("../models/reply");
var middleware	= require("../public/assets/scripts/middleware");



// INDEX - Show all projects

// router.get("/", function(req, res){
// 	var noMatch;
// 	if(req.query.search) {
// 		const regex = new RegExp(escapeRegex(req.query.search), "gi");
// 		// Get all projects from DB
// 		Project.find({name: regex}, function(err, foundProjects){
// 			if(err) {
// 				console.log(err);
// 			} else {
// 				if(foundProjects.length < 1) {
// 					noMatch = "No projects found.";
// 				}
// 				res.render("portfolio/portfolio", {projects: foundProjects, noMatch: noMatch});
// 			}
// 		});
// 	} else {
// 	// Get all projects from DB
// 		Project.find({}, function(err, allProjects){
// 			if(err) {
// 				console.log(err);
// 			} else {
// 				res.render("portfolio/portfolio", {projects: allProjects, noMatch: noMatch});
// 			}
// 		});
// 	}
// });




router.get("/", function(req, res){
	var perPage = 15;
	var pageQuery = parseInt(req.query.page);
	var page = pageQuery ? pageQuery : 1;
	var noMatch = null;
	if(req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Project.find({name: regex}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
			Project.count({name: regex}).exec(function (err, count) {
				if (err) {
					console.log(err);
					res.redirect("back");
				} else {
					if(allProjects.length < 1) {
						noMatch = "Error: No projects found.";
					}
					res.render("portfolio/portfolio", {
						projects: allProjects,
						current: page,
						pages: Math.ceil(count / perPage),
						noMatch: noMatch,
						search: req.query.search
					});
				}
			});
		});
	} else {
        // get all projects from DB
        Project.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
        	Project.count().exec(function (err, count) {
        		if (err) {
        			console.log(err);
        		} else {
        			res.render("portfolio/portfolio", {
        				projects: allProjects,
        				current: page,
        				pages: Math.ceil(count / perPage),
        				noMatch: noMatch,
        				search: false
        			});
        		}
        	});
        });
    }
});

// CREATE - add new projects to DB

router.post("/", middleware.isLoggedIn, function(req, res) {

	//get data from form and add to projects array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var category = req.body.category;
	var date = req.body.date;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newProject = {name: name, image: image, description: description, category: category, date: date, author: author};

	// Create a new project and save to DB
	Project.create(newProject, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			//redirect back to portfolio page
			req.flash("success", "Created new project.");
			res.redirect("/portfolio");
		}
	});
});

// NEW - show form to create new project

router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("portfolio/new-project");
});

// SHOW -- show more info about one project

router.get("/:id", function(req, res) {

	// find the project with the provided ID
	Project.findById(req.params.id).populate("comments").exec(function(err, foundProject){
		if(err || !foundProject) {
			req.flash("error", "Error: Project not found.");
			res.redirect("/portfolio");
		} else {
			Comment.find({}, function(err, foundComment){
				if(err) {
					console.log(err);
				} else {
					Reply.find({}, function(err, foundReply){
						if(err) {
							console.log(err);
						} else {
							res.render("portfolio/show-project", {project: foundProject, comment: foundComment, reply: foundReply});
						}
					});
				}
			});
			
		}
	});
});

// EDIT PROJECT ROUTE

router.get("/:id/edit", middleware.checkProjectOwnership, function(req, res) {
	
	Project.findById(req.params.id, function(err, foundProject) {
		if(err) {
			req.flash("error", "Something went wrong");
			console.log(err);
		} else {
			res.render("portfolio/edit-project", {project: foundProject});
		}
	});
});

	// Othewise redirect
	// If not, redirect


// UPDATE PROJECT ROUTE

router.put("/:id", middleware.checkProjectOwnership, function(req, res) {
	// Find and Update the correct Project
	Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject) {
		if(err) {
			req.flash("error", "Something went wrong.");
			res.redirect("/portfolio");
		} else {
			// Redirect somewhere (Project Show Page)
			req.flash("success", "Project updated.");
			res.redirect("/portfolio/" + req.params.id);
		}
	});
});

// DESTROY PROJECT ROUTE 

router.delete("/:id", middleware.checkProjectOwnership, function(req, res) {
	Project.findByIdAndRemove(req.params.id, function(err, deletedProject) {
		if(err) {
			req.flash("error", "Something went wrong.");
			res.redirect("/portfolio");
		} else {
			req.flash("success", "Project deleted.");
			res.redirect("/portfolio");
		}
	});
});

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;