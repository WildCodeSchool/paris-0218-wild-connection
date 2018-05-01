const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const util = require('util')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const multer = require('multer')
const bodyParser = require('body-parser')

const writeFile = util.promisify(fs.writeFile)
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const rename = util.promisify(fs.rename)

const jasondir = __dirname + "/json/"
const jasondirJob = __dirname + "/json-job/"

const secret = 'a'

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  response.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//set storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },
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

app.use(session({
  secret,
  saveUninitialized: true,
  resave: true,
  store: new FileStore({ secret }),
}))


app.use((req, res, next) => {
  console.log(`mon middleware dit :  ${req.method} ${req.url}`, { user: req.session.user, cookie: req.headers.cookie })

  next()
})

app.get('/', (request, response) => {
  const user = request.session.user || {}

  response.json(user)
})

app.post('/auth', (request, response, next) => {
  readdir(jasondir)
    .then(files => files.map(file => jasondir + file))
    .then(paths => Promise.all(paths.map(path => readFile(path, 'utf8'))))
    .then(users => {
      const user = JSON.parse(
        users.find(u => {
          u = JSON.parse(u)
          if(request.body.mail === u.mail)
           return true
         return false
        })
      )

      if (!user) {
        console.log("user not found")
        return response.json({ error: 'User not found' })
      }

      if (user.password !== request.body.password) {
        console.log('wrong password')
        return response.json({ error: 'Wrong password' })
      }
      request.session.user = user

      response.json(user)
    })
})

app.post('/login', (request, response, next) => {
  const id = Math.random().toString(36).slice(2, 6)
  const filename = `user-${id}.json`
  const dirpath = path.join(jasondir, filename)
  const colors = Math.floor(Math.random() * 5)
  const content = {
    id: id,
    mail: request.body.mail,
    password: request.body.password,
    // default values
    firstName: "Jason",
    lastName: "Du Place-Holder",
    campus: "Paris",
    promo: "2013",
    month: "fevrier",
    color: `profil-colors${colors}`,
    image: "../css/img/deer.png"
  }
  writeFile(dirpath, JSON.stringify(content, null, 2), 'utf8')

    .then(response.json('ok'))
    .catch(next)    
})

app.get('/users', (request, response) => {
  readdir(jasondir)
    .then(files => files.map(file => jasondir + file))
    .then(paths => {
      Promise.all(paths.map(path => readFile(path, 'utf8').then(JSON.parse)))

        .then(users => response.json(users))
    })
})

app.get('/jobs', (request, response) => {
  readdir(jasondirJob)
    .then(filesJob => filesJob.map(filesJob => jasondirJob + filesJob))
    .then(paths => {
      Promise.all(paths.map(path => readFile(path, 'utf8').then(JSON.parse)))
        .then(jobs => response.json(jobs))
    })
})

app.post('/jobs', (request, response, next) => {
  const idJob = Math.random().toString(36).slice(2, 8)
  const fileNameJob = `job-${idJob}.json`
  const dirpathJob = path.join(jasondirJob, fileNameJob)
  const contentJob = request.body
  writeFile(dirpathJob, JSON.stringify(contentJob, null, 2), 'utf8')

    .then(response.send('ok'))
    .catch(next)
})

app.get('/users', (request, response) => {
  console.log(request.session)
  readdir(jasondir)
  .then(files => files.map(file => jasondir + file))
  .then(paths => {
    Promise.all(paths.map(path => readFile(path, 'utf8').then(JSON.parse)))

    .then(users => response.json(users))
  })
})

app.post('/profile', (request, response) => {

  response.send('setting profiles')
})

//upload

app.post('/upload', upload.single('myImage'), async (req, res, next) => {
     const data = req.body
     const file = req.file
     console.log(req.file, req.files)
     const filename = req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname)
     rename(req.file.path, path.join(req.file.destination, filename))

         .then(() => res.end(`file ${filename} added !!!!!!`))
         .catch(next)
 })

app.use((err, req, res, next) => {
  if (err) {
    res.json({ message: err.message })
    console.error(err)
  }
  next(err)
})


app.listen(3456, () => console.log('Port 3456'))
