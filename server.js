require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socket = require("socket.io");

// const path = require('path');

const app = express();

// Static build for Heroku deployment
app.use(express.static('./client/build'));

const server = http.createServer(app);
const io = socket(server);
const cors = require('cors');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Proxy allowing CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://the-symposium.herokuapp.com/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const users = {};

const socketToRoom = {};

io.on("connection", socket => {
  socket.on("join room", roomID => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 1) {
        socket.emit("conversation started");
      } else if (length > 1 && length < 4) {
        socket.emit("conversation started");
      } else if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", payload => {
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });
  
  socket.on("returning signal", payload => {
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });

  // When user leaves
  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter(id => id !== socket.id);
      users[roomID] = room;
    }
    socket.broadcast.emit('user left', socket.id);
  });

  socket.on('user video settings changed', userId => {
    socket.broadcast.emit("user has disabled video", userId);
  });

  // When user sends a message for the chat box
  socket.on('new message', messageInfo => {
    socket.broadcast.emit('update chat box', messageInfo);
  })

});

// For homepage
const homepage = require("./routes/homepage");

// For users
const usersRoutes = require("./routes/users");

app.use("/api", homepage(db));
app.use("/api/users", usersRoutes(db));

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));