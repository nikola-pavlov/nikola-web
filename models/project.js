var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema ({
	name: String,
	image: String,
	description: String,
	category: String,
	date: String,
	createdAt: {type: Date, default: Date.now},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

var Project = mongoose.model("Project", projectSchema);
module.exports = Project;