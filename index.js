const express = require("express"),
  socketIO = require("socket.io"),
  http = require("http"),
  path = require("path"),
  db = require("./db"),
  Message = require("./models"),
  app = express(),
  server = http.createServer(app),
  io = socketIO(server);

const PORT = 4000;
const NEW_MESSAGE = "new message";

const onSocketConnection = socket => {
  socket.on(NEW_MESSAGE, data => {
    const { text, creator } = data;
    Message.create({
      text,
      creator
    }).then(() => {
      socket.broadcast.emit("new message sent", {
        message: data
      });
    });
  });
};

const previousMessages = (req, res) => {
  Message.find()
    .sort({ _id: -1 })
    .then(allMessages => res.json(allMessages));
};

app.get("/previous", previousMessages);

const handleListening = () => console.log(`✅ Server running on port ${PORT}`);
server.listen(PORT, handleListening);
app.use(express.static(path.join(__dirname, "public")));
io.on("connection", onSocketConnection);
