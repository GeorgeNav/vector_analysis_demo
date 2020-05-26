import React from 'react'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:8080'

const Socket = () => {
  const [response, setResponse] = React.useState(null)

  React.useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on('FromAPI', data => {
      setResponse(data)
    })

    return () => {
      console.log('STOPPING COMP')
      socket.removeEventListener('FromAPI', () => { console.log('DONE') })
    }
  }, [])

  return <div>
    It's <time dateTime={response}>{response}</time>
  </div>
}

export default Socket
