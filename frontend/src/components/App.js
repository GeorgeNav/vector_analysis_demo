import React from 'react'
import axios from 'axios'
import './App.css'
import getLineCoordsFromText from '../utils/helpers'
import renderSquare from './three/models/square'
import renderLines from './three/models/lines'

import Socket from './socket/Socket'

function App() {
  const [ showSocketValue, setShowSocketValue ] = React.useState(false)
  const [ curValidFile, setCurValidFile ] = React.useState(null)
  const [ coordsForLines, setCoordsForLines ] = React.useState(null)
  const [ renderElements, setRenderElements ] = React.useState([])

  const removeElements = React.useCallback(() => {
    renderElements.forEach(element => element.remove())
    setRenderElements([])
  })

  React.useEffect(() => {
    if(coordsForLines) {
      const renderLinesElement = renderLines(coordsForLines)
      const renderSquareElement = renderSquare()
      setRenderElements([renderLinesElement, renderSquareElement])
    } else removeElements()
    return removeElements
  }, [coordsForLines])

  const getLineDataFromFile = (e) => {
    e.preventDefault()
    const fileCount = e.target.files.length

    if(fileCount === 0) {
      console.log('No file is selected')
      return
    }

    const firstFile = e.target.files[0]

    const fileReader = new FileReader()

    fileReader.onload = (e) => {
      const text = e.target.result
      const coordsForLines = getLineCoordsFromText(text)

      if(coordsForLines) {
        setCoordsForLines(coordsForLines)
        setCurValidFile(firstFile)
      } else {
        setCoordsForLines(null)
        setCurValidFile(null)
      }
    }

    fileReader.readAsText(firstFile, 'utf-8')
  }

  const sendContent = (e) => {
    e.preventDefault()

    if(curValidFile === null) {
      alert('Please choose a coordinate file to submit')
      return
    }

    const formData = new FormData()
    formData.append('file', curValidFile)

    axios.post('http://localhost:8080/upload', formData, {})
      .then(res => alert('SUCCESS!'))
      .catch(err => alert(err))
  }

  return <div algin='center'>
    <button onClick={() => setShowSocketValue(prev => !prev)}>{showSocketValue ? 'Disconnect' : 'Connect To'} Socket Value</button><br/>
    {showSocketValue && <Socket/>}
    <form onSubmit={sendContent} align='center'>
      <input type='file' name='file' onChange={getLineDataFromFile}/>
      <button type='submit'>Submit</button>
    </form>
  </div>
}

export default App
