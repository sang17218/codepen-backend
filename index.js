// const server = require('http').createServer();
import {createServer} from 'http'
import {Server} from 'socket.io'
import express from 'express'

console.log(Server.id)
const app = express()
const server = createServer(app)
console.log("created server")

const socketIO = new Server(server)
console.log(socketIO.id)
  
socketIO.on('connection', client => {
  console.log("connected...", client.id)
  client.on('event', data => { 
      console.log("hi ", data)
  });
  client.on('message', data => {
      console.log("received msg", data)
      socketIO.emit('message',data)
  })
  client.on('disconnect', () => { 
      console.log("disconnected")
  });
  client.on('join-room', (room) => {
    client.join(room);
  });
  client.on('create-room',() => {
    socketIO.of("/").adapter.on("create-room", (room) => {
            console.log(`room ${room} was created`);
          });
  })
  client.on('join-room', (roomId) => {
           client.join(roomId)
   })
});

app.get('/', function (req, res) {
    res.sendFile('/Users/sangeetha_lakshmanan/react-apps/codepen-backend/index.html')
})

app.get('/createRooms', function (req, res) {
    console.log("hello")
    // socketIO.of("/createRooms").adapter.on("create-room", (room) => {
    //     console.log(`room ${room} was created`);
    //   });
      res.send("OK")
})

server.listen(4000);
