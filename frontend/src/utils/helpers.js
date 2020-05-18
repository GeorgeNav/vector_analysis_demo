const arrayToNChunks = (array, chunks) => {
  let result = []

  for (let i = chunks; i > 0; i--)
      result.push(array.splice(0, Math.ceil(array.length / i)))

  return result
}

// Check if there are 3 number values for each 3D coordinate
const eachLineHasValidCoords = (CoordsForEachLine, index = 0) => {
  if(index === CoordsForEachLine.length)
    return true
  else if(CoordsForEachLine[index].length !== 0 &&
          CoordsForEachLine[index].length % 3 === 0) {
    const posLineCoords = arrayToNChunks(CoordsForEachLine[index])
    const allCoordResults = posLineCoords.map(posCoord =>
      posCoord.every(
        posCoordVal => !isNaN(posCoordVal)))
    
    return allCoordResults.every(coordResult => coordResult)
      ? eachLineHasValidCoords(CoordsForEachLine, index + 1)
      : false
  }

  return false
}

const getLineCoordsFromText = (text) => {
  /// Convert string of coordinates in array of line coordinates ///
  const fileLines = text.split(/\r?\n/)

  /// Convert each line into a array of floats ///
  const posCoordsForLines = fileLines
    .map(row =>             // convert each line into array of floats
      row.replace(',', '')  // remove EOL comma of n - 1 rows (where n is 2 or more)
      .trim()               // remove excess spaces at the beginning/end of the line
      .split(/\s+/)         // create string array by splitting at 1 or more spaces
      .map(Number)          // convert string array to float array
  )

  if(eachLineHasValidCoords(posCoordsForLines)) {
    const coordsForLines = posCoordsForLines.map(lineCoords => {
      const numLineCoords = lineCoords.length / 3
      return arrayToNChunks(lineCoords, numLineCoords)
    })

    return coordsForLines 
  }

  return null
}

export default getLineCoordsFromText