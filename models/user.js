var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema ({
	username: {type: String, unique: true, required: true},
	email: {type: String, unique: true, required: true},
	firstName: String,
	lastName: String,
	password: String,
	avatar: String,
	info: String,
	isAdmin: {type: Boolean, default: false},
	createdAt: {type: Date, default: Date.now},
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);