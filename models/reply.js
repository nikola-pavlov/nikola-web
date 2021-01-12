var mongoose = require("mongoose");

// var replySchema = mongoose.Schema({
// 	text: String,
// 	author: {
// 		id: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User"
// 		},
// 		username: String
// 	}
// });

var replySchema = mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String,
	},
	commentID: String,
	createdAt: {type: Date, default: Date.now}
});



module.exports = mongoose.model("Reply", replySchema);