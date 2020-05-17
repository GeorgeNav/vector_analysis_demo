import React from 'react'
import axios from 'axios'
import './App.css'
import { arrayToNChunks } from '../utils/helpers'
import Model from './three/Model'

// const acceptedFileTypes = ['txt']

function App() {
  const [ file, setFile ] = React.useState(null)
  const [ data, setData ] = React.useState(null)

  const getFileData = (e) => {
    e.preventDefault()
    const fileCount = e.target.files.length

    if(fileCount === 0) {
      console.log('No file is selected')
      return
    }

    const firstFile = e.target.files[0]
    
    // convert txt data into matrix of floats
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const text = e.target.result
      console.log('text:', text)

      // preprocessing and validation
      let M = text.split(/\r?\n/)
      M = M.map(row =>
        row.replace(',', '').trim()
        .split(' ').map(Number))

      if(M[0].length % 3 === 0) { // check if there are 3 values for each 3D coord
        const numberOfCoords = M[0].length / 3
        M = M.map(row => arrayToNChunks(row, numberOfCoords))
        setData(M)
        setFile(firstFile) // link file state to current file
      }
    }

    fileReader.readAsText(firstFile, 'utf-8')
  }

  const sendContent = (e) => {
    if(file === null) {
      console.log('ERROR: no file to send')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    axios.post('http://localhost:8080/upload', formData, {})
      .then(res => console.log(res.statusText))
      .catch(err => console.log(err))
  }

  return <div algin='center'>
    <form onSubmit={sendContent} align='center'>
      <input type='file' name='file' onChange={getFileData}/>
      <button type='submit'>Submit</button>
    </form>
    {data && <Model data={data}/>}
  </div>
}

export default App
