var mongoose = require("mongoose");

var photoSchema = mongoose.Schema({
	photo: String
});

module.exports = mongoose.model("Photo", photoSchema);