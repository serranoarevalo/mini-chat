const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  text: String,
  creator: String
});

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
