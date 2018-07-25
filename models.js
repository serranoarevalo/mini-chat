const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  text: String
});

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
