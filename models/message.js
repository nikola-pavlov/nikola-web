 var mongoose = require("mongoose");

 var messageSchema = new mongoose.Schema({
 	firstName: String,
 	lastName: String,
 	email: String,
 	subject: String,
 	message: String,
 	sendAt: {type: Date, default: Date.now}
 });

var Message = mongoose.model("Message", messageSchema);
module.exports = Message;