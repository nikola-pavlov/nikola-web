var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var projectSchema = new mongoose.Schema ({
	name: String,
	image: String,
	description: String,
	category: String,
	date: String
});

var Project = mongoose.model("Project", projectSchema);
module.exports = Project;