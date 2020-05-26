import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:8080'

let socket = socketIOClient(ENDPOINT)

export default socket
