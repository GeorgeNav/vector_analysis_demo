const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => { // Where incoming file is stored
    cb(null, 'public')
  },
  filename: (req, file, cb) => { // What name is given to incoming file
    cb(null, file.originalname + ' - ' + Date.now())
  },
})

const upload = multer({ storage })


const express = require('express')
const router = express.Router()

router.post('/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if(err)
      res.status(500).json(err)
    res.status(200).send(req.file)
  })
})

router.post('/socket', (req, res) => {

})

router.get('/', () => res('CONNECTED'))

module.exports = router
