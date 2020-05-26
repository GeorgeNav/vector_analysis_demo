const express = require('express')
const http = require('http')
const cors = require('cors')

const app = express()

const routes = require('./routes')

app.use(cors()) // Allow cross origin
app.use(routes)

const server = http.createServer(app)



const socketIo = require('socket.io')
const io = socketIo(server)

let interval
let val = 0

const getApiAndEmit = (socket) => {
  console.log(`\t\t${val} + 1 = ${val + 1}`)
  const response = val++ + 1
  socket.emit('FromAPI', response)
}

io.on('connection', (socket) => {
  console.log('+ New client connected')

  if(interval) {
    console.log('\t- Clearing interval')
    val = 0
    clearInterval(interval)
  }

  console.log('\t+ Setting interval')
  interval = setInterval(() => getApiAndEmit(socket), 1000)

  socket.on('disconnect', () => {
    console.log('- Client disconnected')
    val = 0
    clearInterval(interval)
  })
})




const PORT = process.env.PORT || 8080

server.listen(PORT, () => console.log(`listening on ${PORT}`))

