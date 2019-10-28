var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Project	= require("../models/project");
var Comment	= require("../models/comment");
var Reply	= require("../models/reply");
var User	= require("../models/user");
var middleware	= require("../public/assets/scripts/middleware");
var multer = require('multer');
var storage = multer.diskStorage({
	filename: function(req, file, callback) {
		callback(null, Date.now() + file.originalname);
	}
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    	return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
	cloud_name: process.env.CLOUDINARY_NAME, 
	api_key: process.env.CLOUDINARY_API_KEY, 
	api_secret: process.env.CLOUDINARY_API_SECRET
});



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
router.put("/:user_id", upload.single('image'), middleware.checkUserOwnership, function(req, res){
	
	User.findById(req.params.user_id, async function(err, foundUser){
		if(err) {
			req.flash("error", "Error: User not found.");
			res.redirect("back");
		} else {
			if(req.file) {
				try {
					await cloudinary.v2.uploader.destroy(foundUser.imageId);
					var result = await cloudinary.v2.uploader.upload(req.file.path, {transformation: [
  {aspect_ratio: "1:1", crop: "fill"},
  {width: "400", dpr: "auto", crop: "scale", quality: "auto:eco"}
  ]});
					foundUser.imageId = result.public_id;
					foundUser.image = result.secure_url;

				} catch(err) {
					req.flash("error", "Error: User not found.");
					return res.redirect("back");
				}
			}

			foundUser.username = req.body.user.username;
			foundUser.email = req.body.user.email;
			foundUser.firstname = req.body.user.firstName;
			foundUser.lastname = req.body.user.lastName;
			foundUser.info = req.body.user.info;

			foundUser.save();
			
			req.flash("success", "Your user has been edited.");
			res.redirect("/users/" + req.params.user_id);
		}
	});
});

// DELETE ROUTE

router.delete("/:user_id", middleware.checkUserOwnership, function(req, res){

	User.findById(req.params.user_id, async function(err, foundUser){
		if(err) {
			req.flash("error", "Error: User not found.");
			return res.redirect("back");
		}
		try {
			await cloudinary.v2.uploader.destroy(foundUser.imageId);
			foundUser.remove();
			req.logout();
			req.flash("success", "User was removed.");
			res.redirect("/");
		} catch(err) {
			if(err) {
				req.flash("error", "Error: User not found.");
				return res.redirect("back");
			}
		}
	});
});
	// User.findByIdAndRemove(req.params.user_id, function(err, removedUser){
	// 	if(err) {
	// 		console.log(err);
	// 		res.redirect("back");
	// 	} else {
	// 		req.logout();
	// 		req.flash("success", "User was removed.");
	// 		res.redirect("/");
	// 	}
	// });




	module.exports = router;