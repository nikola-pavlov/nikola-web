var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema ({
	username: String,
	email: String,
	firstName: String,
	lastName: String,
	password: String,
	isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);