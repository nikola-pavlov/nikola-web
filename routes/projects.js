var express = require("express");
var router = express.Router();
var Project	= require("../models/project");


// INDEX - Show all projects

router.get("/", function(req, res){
	// Get all projects from DB
	Project.find({}, function(err, allProjects) {
		if(err) {
			console.log(err); 
		} else {
			res.render("portfolio/portfolio", {projects:allProjects});
		}
	});
});

// CREATE - add new projects to DB

router.post("/", isLoggedIn, function(req, res) {

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
			console.log(newlyCreated);
			res.redirect("/portfolio");
		}
	});
});

// NEW - show form to create new project

router.get("/new", isLoggedIn, function(req, res) {
	res.render("portfolio/new-project");
});

// SHOW -- show more info about one project

router.get("/:id", function(req, res) {

	// find the project with the provided ID
	Project.findById(req.params.id).populate("comments").exec(function(err, foundProject){
		if(err) {
			console.log(err);
		} else {
			console.log("Found Project:" + foundProject);
			// render show template with that project
			res.render("portfolio/show-project", {project: foundProject});
		}
	});
});

// EDIT PROJECT ROUTE

router.get("/:id/edit", checkProjectOwnership, function(req, res) {
	
	Project.findById(req.params.id, function(err, foundProject) {
		if(err) {
			console.log(err);
		} else {
			res.render("portfolio/edit-project", {project: foundProject});
		}
	});
});
	
	// Othewise redirect
	// If not, redirect


// UPDATE PROJECT ROUTE

router.put("/:id", checkProjectOwnership, function(req, res) {
	// Find and Update the correct Project
	Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject) {
		if(err) {
			res.redirect("/portfolio");
		} else {
			// Redirect somewhere (Project Show Page)
			res.redirect("/portfolio/" + req.params.id);
		}
	});
});

// DESTROY PROJECT ROUTE 

router.delete("/:id", checkProjectOwnership, function(req, res) {
	Project.findByIdAndRemove(req.params.id, function(err, deletedProject) {
		if(err) {
			res.redirect("/portfolio");
		} else {
			res.redirect("/portfolio");
		}
	});
});

// Middleware

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkProjectOwnership(req, res, next) {
	if(req.isAuthenticated()) {
		Project.findById(req.params.id, function(err, foundProject) {
			if(err) {
				res.redirect("back");
			} else {
				// Does User own the project?
				if(foundProject.author.id.equals(req.user._id)) {
					return next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

module.exports = router;