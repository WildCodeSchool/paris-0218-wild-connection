const express = require('express')
const multer = require('multer')
const path = require('path')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser')

const db = require('./db-fs.js')

const secret = 'secret'

const app = express()

// Middlewear
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
  saveUninitialized: false,
  resave: true,
  store: new FileStore({ secret })
}))

app.use((req, res, next) => {
  console.log('===========')
  console.log(`mon middleware dit :  ${req.method} ${req.url}`, { user: req.session.user, cookie: req.headers.cookie })
  console.log('===========')
  next()
})

app.get('/', (request, response) => {
  const user = request.session.user || {}
  response.json(user)
})

app.get('/users', (request, response, next) => {
  db.getUsers()
    .then(users => response.json(users))
    .catch(next)
})

app.get('/jobs', (request, response, next) => {
  db.getJobs()
    .then(jobs => response.json(jobs))
    .catch(next)
})

app.post('/auth', (request, response, next) => {
  db.getUsers()
    .then(users => {
      const user = users.find(u => {
        if(request.body.mail === u.email)
          return true
        return false
      })

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

// sign-up
app.post('/login', (request, response, next) => {
  const random = Math.floor(Math.random() * 5)
  const user = {
    email: request.body.email,
    password: request.body.password,
    // default values
    firstName: 'Jason',
    lastName: 'Du Place-Holder',
    campus: 'Paris',
    promo: '2013',
    month: 'fevrier',
    color: `profil-colors${random}`
  }
  db.addUser(user)
    .then(response.json('ok'))
    .catch(next)
})

app.post('/jobs', (request, response, next) => {
  const job = request.body
  db.addJob(job)
      .then(response.json('ok'))
      .catch(next)
})





app.post('/myProfile', (request, response, next) => {
  const users = db.getUsers()
  console.log(request.session.user.id)
 // .then(users => )
}
)





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
