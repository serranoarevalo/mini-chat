const express = require("express"),
  socketIO = require("socket.io"),
  http = require("http"),
  app = express(),
  server = http.createServer(app),
  io = socketIO(server);

const PORT = 4000;
const handleListening = () => console.log(`Server running on port ${PORT}`);

server.listen(PORT, handleListening);
