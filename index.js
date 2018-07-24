const express = require("express"),
  socketIO = require("socket.io"),
  http = require("http"),
  path = require("path"),
  app = express(),
  server = http.createServer(app),
  io = socketIO(server);

const PORT = 4000;
const handleListening = () => console.log(`Server running on port ${PORT}`);

const onSocketConnection = socket => {
  console.log(socket);
};

server.listen(PORT, handleListening);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", onSocketConnection);
