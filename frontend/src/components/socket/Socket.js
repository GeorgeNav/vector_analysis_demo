import React from 'react'
import io from 'socket.io-client'
const endpoint = 'http://localhost:8080'

const useSocket = (endpoint) => {
  const [socket, setSocket] = React.useState(null)

  React.useEffect(() => {
    if(!socket) {
      const socketConnection = io(endpoint, { autoConnect: true })
      console.log('Attempting socket connection')
      setSocket(socketConnection)
    }

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
  const socket = useSocket(endpoint)
  const inputRef = React.useRef()

  React.useEffect(() => {
    if(socket)
      socket.on('FromAPI', data => {
        setValue(data)
      })

    return () => {
      if(socket)
        socket.removeEventListener('FromAPI', () => { console.log('DONE') })
    }
  }, [socket])

  const sendNewVal = () => {
    const newVal = inputRef.current.value
    if(!isNaN(newVal))
      socket.emit('SetAPIVal', newVal, (message) => {
        console.log(message)
        setValue(newVal)
      })
  }

  return <div>
    Socket Connected: <strong>{socket ? 'SUCCESS' : 'FAILED'}</strong><br/>
    {socket &&
      <div>
        Socket Value: <strong>{value}</strong><br/>
        Set Socket Value: <input type='text' ref={inputRef}/><br/>
        <button onClick={sendNewVal}>
          Send New Socket Value
        </button><br/>
      </div>}
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
