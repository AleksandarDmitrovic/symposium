require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socket = require("socket.io");

const path = require('path');

const app = express();
const port = process.env.PORT || 8000;



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

//WebSocket Setup
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

wss.on("connection", socket => {
  socket.onmessage = event => {
    // console.log(`Message Received: ${event.data}`);

    if (event.data === "ping") {
      // socket.send(JSON.stringify("pong"));
    }
  };
});

const updateConversations = (id) => {
  wss.clients.forEach(function eachClient(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "UPDATE_CONVERSATIONS",
          id
        })
      );
    }
  });
};

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
  });

});

// For homepage
const homepage = require("./routes/homepage");

// For users
const usersRoutes = require("./routes/users");

app.use("/api", homepage(db, updateConversations));
app.use("/api/users", usersRoutes(db));


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

server.listen(port, () => console.log(`server is running on port ${port}`));