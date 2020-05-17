const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()

app.use(cors()) // Allow cross origin

const storage = multer.diskStorage({
  destination: (req, file, cb) => { // Where incoming file is stored
    cb(null, 'public')
  },
  filename: (req, file, cb) => { // What name is given to incoming file
    cb(null, file.originalname + ' - ' + Date.now())
  },
})

const upload = multer({ storage })

app.post('/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if(err)
      res.status(500).json(err)
    res.status(200).send(req.file)
  })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`listening on ${PORT}`))

