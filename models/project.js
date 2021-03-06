var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema ({
	name: String,
	image: String,
	description: String,
	category: String,
	type: String,
	date: Date,
	year: String,
	createdAt: {type: Date, default: Date.now},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	likes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	photos: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Photo"
	}],
	tech: [{
		type: String
	}],
	techAll: [{
		type: String
	}],
	views: {type: Number, default: 0},
	order: Number,
	color: String
});

var Project = mongoose.model("Project", projectSchema);
module.exports = Project;