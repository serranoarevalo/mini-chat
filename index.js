const express = require("express"),
  socketIO = require("socket.io"),
  http = require("http"),
  path = require("path"),
  app = express(),
  server = http.createServer(app),
  io = socketIO(server);

const PORT = 4000;
const NEW_MESSAGE = "new message";

const onNewMessage = data => {
  console.log(data);
};

const onSocketConnection = socket => {
  socket.on(NEW_MESSAGE, onNewMessage);
};

const handleListening = () => console.log(`Server running on port ${PORT}`);
server.listen(PORT, handleListening);
app.use(express.static(path.join(__dirname, "public")));
io.on("connection", onSocketConnection);
