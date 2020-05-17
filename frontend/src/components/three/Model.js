import React from 'react'
import renderSquare from './models/square'
import renderLines from './models/lines'

const Model = ({ data: lines }) => {
  React.useEffect(() => {
    renderLines(lines)
    renderSquare()
  }, [lines])

  // return <div ref={ref => setMount(ref)}></div>
  return <div></div>
}

export default Model