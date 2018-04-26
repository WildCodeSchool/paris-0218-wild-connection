const session = require('express-session')
const FileStore = require('session-file-store')(session)
const path  = require('path')
const express = require('express')
const multer = require('multer')
// const ejs = require('ejs')
const fs = require('fs')
const util = require('util')

const rename = util.promisify(fs.rename)


//init app
const app = express()


//set storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'views/public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
// init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },
    // FileFilter: (req, file, cb) => {
    //     checkFileType(file, cb)
    // }
})

// check File Type
const checkFileType = (file, cb) => {
    //alowed ext
    const filetypes = /jpeg|jpg|png|gif/
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    // check mime
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Image Only!')
    }
}
//EJS
// app.set('view engine', 'ejs')

// public folder
app.use(express.static('./public'))
app.get('/', (req, res) => {
    res.send('ok')
    console.log('Get GET get')
  })

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

// // sessions 
// app.use(session({
//     store: new FileStore({
//         path: path.join(__dirname, '/tmp')
//     }),
//     secret: 'Super Secret !',
//     resave: true,
//     saveUninitialized: true,
//     name : 'sessionId'
// }));

// app.get('/session-in', (req,res) => {
//     req.session.song = 'Be bop lula'
//     // res.send(req.session.song)
//     console.log('test in')
//     res.end('')
// })
// app.get('/session-out', (req, res) => {
//     res.send(req.session.song)
//     console.log('test out')
// })

// upload

app.post('/upload', upload.single('myImage'), async (req, res, next) => {
    const data = req.body
    const file = req.file
    console.log(req.file, req.files)
    const filename = req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname)
    rename(req.file.path, path.join(req.file.destination, filename))
        .then(() => res.end(`file ${filename} added !!!!!!`))
        .catch(next)
})

  const port = 3000
app.listen(port, () => console.log(`Server started on port ${port}`))