var mongoose = require("mongoose");

var photoSchema = mongoose.Schema({
	photo: String,
	projectID: String,
	order: Number
});

module.exports = mongoose.model("Photo", photoSchema);