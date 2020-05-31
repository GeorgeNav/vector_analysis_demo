import React from 'react'

import io from 'socket.io-client'
const ENDPOINT = 'http://localhost:8080'

const sock = io(
  ENDPOINT,
  { autoConnect: true }
)

const useSocket = () => {
  const socket = React.useState(sock)[0]

  React.useEffect(() => {
    return () => {
      if(socket) {
        socket.removeAllListeners()
        socket.close()
      }
    };
  }, [socket])

  return socket
}

const Socket = () => {
  const [value, setValue] = React.useState(null)
  const socket = useSocket()
  const inputRef = React.useRef()

  React.useEffect(() => {
    socket.on('FromAPI', data => {
      setValue(data)
    })

    return () => {
      socket.removeEventListener('FromAPI', () => { console.log('DONE') })
    }
  }, [])

  const sendNewVal = () => {
    const newVal = inputRef.current.value
    if(!isNaN(newVal))
      socket.emit('SetAPIVal', newVal, (message) => {
        console.log(message)
        setValue(newVal)
      })
  }

  return <div>
    It's <time dateTime={value}>{value}</time>
    <input type='text' ref={inputRef}/>
    <button onClick={sendNewVal}>Send New Val</button>
  </div>
}

export default Socket

/*
import React from 'react'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:8080'

const Socket = () => {

}

export default Socket
*/