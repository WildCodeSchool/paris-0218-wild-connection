const express = require('express')
const path = require('path')
const util = require('util')
const fs = require('fs')

const writeFile = util.promisify(fs.writeFile)
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const jasondir = __dirname + "/json/"
const wildjob = require('./wildjob-mock.json')

const app = express()

//Ajout du app.js
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const multer = require('multer')
const rename = util.promisify(fs.rename)



app.use((request, response, next) => {
  if (request.method === 'GET') return next()

  let accumulator = ''

  request.on('data', data => {
    accumulator += data
  })

  request.on('end', () => {
    request.body = JSON.parse(accumulator)
    next()
  })
})

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use((request, response, next) => {
  console.log(`${request.method} ${request.url}`)
  next()
})

app.get('/', (request, response) => {
  response.send("Bienvenue sur notre site trop cool. Y'aura un formulaire d'inscription ici plus tard")
})

app.get('/login', (request, response) => {
  response.send('Bienvenue login')
})

app.post('/login', (request, response, next) => {
  const id = Math.random().toString(36).slice(2, 6)
  const filename = `user-${id}.json`
  const dirpath = path.join(jasondir, filename)

  const color = Math.random()
  const content = {
    id: id,
    mail: request.body.mail,
    password: request.body.password,
    // default values
    firstName: "Bob",
    lastName: "Marley",
    campus: "Paris",
    promo: "2013",
    month: "fevrier"
  }
  if(color < 0.2){
    content.color = 'profil-colors0'
  }
  else if(color < 0.4) {
    content.color = 'profil-colors1'
  } 
  else if(color < 0.6) {
    content.color = 'profil-colors2'
    
  }
  else if(color < 0.8) {
    content.color = 'profil-colors3'
    
  }
  else if(color < 1) {
    content.color = 'profil-colors4'
  }

  // if (!content.mail.includes('@')) {
  //   response.status(500).json('invalid mail')
  //   return
  // }

  writeFile(dirpath, JSON.stringify(content, null, 2), 'utf8')
    .then(response.json('ok'))
    .catch(next)
})

app.get('/jobs', (request, response) => {
  response.send('hey les offres')
})

app.post('/jobs', (request, response) => {
  let idJob = Math.random().toString(36).slice(2, 8)
  let fileNameJob = `${idJob}.json`
  const dirpathJob = path.join(__dirname, fileNameJob)
  const formJob = {
      id : idJob,
      contract : request.body.contract, 
      city : request.body.city,
      begDate : request.body.begDate,
      endDate : request.body.endDate,
      title : request.body.title,
      companyName : request.body.companyName,
      description : request.body.description
  }
  writeFile(dirpathJob, JSON.stringify(formJob, null, 2), 'utf8')
    .then(response.send('ok'))
    // .catch(err => response.status(404).end('error 404'))
})

app.get('/users', (request, response) => {
  readdir(jasondir)
    .then(files => files.map(file => jasondir + file))
    .then(paths => {
      Promise.all(paths.map(path => readFile(path, 'utf8').then(JSON.parse)))
        .then(users => response.json(users))
    })

})

//set storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'server/public/uploads'),
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


app.listen(3456, () => console.log('Port 3456'))
