import React from 'react'
import axios from 'axios'
import './App.css'
import getLineCoordsFromText from '../utils/helpers'
import renderSquare from './models/square'
import renderLines from './models/lines'

// const acceptedFileTypes = ['txt']

function App() {
  const [ curValidFile, setCurValidFile ] = React.useState(null)
  const [ coordsForLines, setCoordsForLines ] = React.useState(null)
  const [ renderElements, setRenderElements ] = React.useState([])

  React.useEffect(() => {
    if(coordsForLines) {
      const renderLinesElement = renderLines(coordsForLines)
      const renderSquareElement = renderSquare()
      setRenderElements([renderLinesElement, renderSquareElement])
    } else {
      renderElements.forEach(element => element.remove())
      setRenderElements([])
    }
  }, [coordsForLines])

  const getFileData = (e) => {
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
    <form onSubmit={sendContent} align='center'>
      <input type='file' name='file' onChange={getFileData}/>
      <button type='submit'>Submit</button>
    </form>
  </div>
}

export default App
