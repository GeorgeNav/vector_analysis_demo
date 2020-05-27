const express = require('express')
const http = require('http')
const cors = require('cors')

// Imports
const routes = require('./routes')

const app = express()

// Uses
app.use(cors()) // Allow cross origin
app.use(routes)

// Create server
const server = http.createServer(app)

// Use socket with server
const socketIo = require('socket.io')
const io = socketIo(server)




// Val to listen to
let val = 0
const changeValIndefinitely = setInterval(() => {
  val += 1
  io.emit('FromAPI', val)
}, 1000)

io.on('connection', (socket) => {
  console.log(`+ ${socket.id}`)

  socket.on('SetAPIVal', (newVal) => {
    if(!isNaN(newVal)) {
      val = parseInt(newVal)
      io.emit('FromAPI', val)
    }
  })

  socket.on('disconnect', () => {
    console.log(`- ${socket.id}`)
  })
})




// Start listening
const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
