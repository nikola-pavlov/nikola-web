var mongoose = require("mongoose");

var photoSchema = mongoose.Schema({
	photo: String,
	projectID: String
});

module.exports = mongoose.model("Photo", photoSchema);