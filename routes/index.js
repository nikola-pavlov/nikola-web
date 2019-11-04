var express = require("express");
var router = express.Router();
var passport = require("passport");
var Project	= require("../models/project");
var Comment	= require("../models/comment");
var Reply	= require("../models/reply");
var User	= require("../models/user");
var async 	= require("async");
var dotenv 	= require('dotenv').config();
var nodemailer 	= require("nodemailer");
var crypto 	= require("crypto");
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

router.post("/register", upload.single('image'), async function(req, res){
	if(req.file) {
		try {
			var result = await cloudinary.v2.uploader.upload(req.file.path, {transformation: [
				{aspect_ratio: "1:1", crop: "fill"},
				{width: "400", dpr: "auto", crop: "scale", quality: "auto:eco"}
				]});
			req.body.image = result.secure_url;
			req.body.imageId = result.public_id;
		} catch(err) {
			req.flash("error", "Can't upload image, try again later.");
			return res.redirect("back");
		}
	}

	var newUser = new User(
	{
		username: req.body.username, 
		email: req.body.email, 
		firstName: req.body.firstName, 
		lastName: req.body.lastName, 
		avatar: req.body.avatar,
		image: req.body.image,
		imageId: req.body.imageId,
		isPublic: req.body.isPublic
	});

	if(req.body.password === req.body.confirm) {
		User.register(newUser, req.body.password, function(err, user){
			if(err) {
				req.flash("error", err.message);
				res.redirect("/register");
			} else {
				passport.authenticate("local")(req, res, function(){
					user.isOnline = true;
					user.save();
					req.flash("success", "You have been registered. Welcome " + user.username +".");
					res.redirect("/");
				});
			}
		});
	} else {
		req.flash("error", "Error: Passwords does not match.");
		res.redirect("/register");
	}

});

// show login form

router.get("/login", function(req, res){
	res.render("login/login");
});

// handle login logic

// router.post("/login", passport.authenticate("local",
// {
// 	successRedirect: "/",
// 	failureRedirect: "/login",
// }), function(req, res){

// });




// traditional route handler, passed req/res
router.post("/login", function(req, res, next) {

  // generate the authenticate method and pass the req/res
  passport.authenticate('local', function(err, user, info) {
  	if (err) { 
  		return next(err); 
  	}
  	if (!user) { 
  		return res.redirect('/'); 
  	}

    // req / res held in closure
    req.logIn(user, function(err) {
    	if (err) { 
    		return next(err); 
    	}
    	user.isOnline = true;
    	user.save();
    	req.flash("success", "You have been logged in. Welcome " + user.username + ".");
    	return res.redirect('/');
    });

})(req, res, next);

});






// logout route

router.get("/logout", function(req, res) {
	User.findById(req.user._id, function(err, user){
		if(err) {
			console.log(err);
			res.redirect("back");
		} else {
			console.log("BEFORE LOGOUT: " + user);
			user.isOnline = false;
			user.save();
			console.log("AFTER LOGOUT: " + user);
			req.logout();
			req.flash("success", "You have been logged out.");
			res.redirect("back");
		}
	});
});



// FORGOT PASSWORD ROUTES 

// forgot password
router.get('/reset', function(req, res) {
	res.render('login/forgot');
});

router.post('/forgot', function(req, res, next) {
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {
			User.findOne({ email: req.body.email }, function(err, user) {
				if (!user) {
					req.flash('error', 'No account with that email address exists.');
					return res.redirect('/reset');
				}

				user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
        	done(err, token, user);
        });
    });
		},
		function(token, user, done) {
			var smtpTransport = nodemailer.createTransport({
				service: 'Gmail', 
				auth: {
					user: 'nikola8989@gmail.com',
					pass: process.env.GMAILPW
				}
			});
			var mailOptions = {
				to: user.email,
				from: 'nikola8989@gmail.com',
				subject: 'Node.js Password Reset',
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
				'http://' + req.headers.host + '/reset/' + token + '\n\n' +
				'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				console.log('mail sent');
				req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
				done(err, 'done');
			});
		}
		], function(err) {
			if (err) return next(err);
			res.redirect('/reset');
		});
});

router.get('/reset/:token', function(req, res) {
	User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		if (!user) {
			req.flash('error', 'Password reset token is invalid or has expired.');
			return res.redirect('/reset');
		}
		res.render('login/reset', {token: req.params.token});
	});
});

router.post('/reset/:token', function(req, res) {
	async.waterfall([
		function(done) {
			User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
				if (!user) {
					req.flash('error', 'Password reset token is invalid or has expired.');
					return res.redirect('back');
				}
				if(req.body.password === req.body.confirm) {
					user.setPassword(req.body.password, function(err) {
						user.resetPasswordToken = undefined;
						user.resetPasswordExpires = undefined;

						user.save(function(err) {
							req.logIn(user, function(err) {
								done(err, user);
							});
						});
					})
				} else {
					req.flash("error", "Passwords do not match.");
					return res.redirect('back');
				}
			});
		},
		function(user, done) {
			var smtpTransport = nodemailer.createTransport({
				service: 'Gmail', 
				auth: {
					user: 'nikola8989@gmail.com',
					pass: process.env.GMAILPW
				}
			});
			var mailOptions = {
				to: user.email,
				from: 'nikola8989@gmail.com',
				subject: 'Your password has been changed',
				text: 'Hello,\n\n' +
				'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				req.flash('success', 'Success! Your password has been changed.');
				done(err);
			});
		}
		], function(err) {
			res.redirect('/portfolio');
		});
});



module.exports = router;