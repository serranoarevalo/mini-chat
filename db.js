const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/mini-chat",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ DB Connected");
const handleError = error => console.log(`❌ Error on DB Connection: ${error}`);

db.on("error", error => handleError(error));
db.once("open", handleOpen);

module.exports = db;
