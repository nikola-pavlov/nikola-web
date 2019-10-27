var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema ({
	username: {type: String, unique: true, required: true},
	email: {type: String, unique: true, required: true},
	firstName: String,
	lastName: String,
	password: String,
	avatar: {type: String, default:"http://oakclifffilmfestival.com/assets/placeholder-user.png"},
	image: String,
	imageId: String, 
	info: String,
	isAdmin: {type: Boolean, default: false},
	createdAt: {type: Date, default: Date.now},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	isOnline: {type: Boolean, default: false},
	isPublic: {type: Boolean, default: true}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);