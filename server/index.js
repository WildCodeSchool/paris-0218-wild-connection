const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const util = require('util')
const fs = require('fs')

const session = require('express-session')
const FileStore = require('session-file-store')(session)
const mysql = require('mysql2/promise')

const rename = util.promisify(fs.rename)

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
app.use(bodyParser.urlencoded({ extended: true }))

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
  store: new FileStore({ secret })
}))


app.use((req, res, next) => {
  console.log(`mon middleware dit :  ${req.method} ${req.url}`, { user: req.session.user, cookie: req.headers.cookie })
  next()
})

// routes
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
  request.session.destroy()
  response.json('ok')
//   db.getJobs()
//     .then(jobs => response.json(jobs))
//     .catch(next)
})

app.post('/auth', (request, response, next) => {
  db.getUsers()
    .then(users => {  
      const user = users.find(u => request.body.mail === u.email ? true : false)
      
      if (!user) {
        console.log("user not found")
        return response.json('User not found')
      }

      if (user.password !== request.body.password) {
        console.log('wrong password')
        return response.json('Wrond password')

      } else {
      request.session.user = user
      response.json('Ok')
      }

    })
})

// sign-up
app.post('/login', (request, response, next) => {
  db.getUsers()
    .then(users => users.find(user => user.email === request.body.email ? true : false))
    .then(isNewMail => {
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
        color: `profil-colors${random}`,
        image: "../css/img/deer.png"
      }

      if (isNewMail === undefined) {
        console.log('new user : ', user)
        db.addUser(user)
          .then(response.json('Success ! You can login now !'))
          .catch(next)
      } else {
        response.json('This mail is already used')
      }
    })
})

app.post('/jobs', (request, response, next) => {
  const job = request.body
  db.addJob(job)
      .then(response.json ('ok'))
      .catch(next)
})

app.post('/updateProfile', (request, response, next) => {  
  db.getUsers()
  .then(users => {
    console.log(users)
    let theUser = users.find(user => request.session.user.id === user.id ? true : false)

    console.log('premodif = ' ,theUser)
    request.body.color = theUser.color
    request.body.image = theUser.image
    request.body.id = theUser.id
    theUser = request.body
    console.log('postmodif = ', theUser)

    db.updateUser(theUser)
      .then(response.json('Ok'))
      .catch(next)
  })
})

app.post('/upload', upload.single('myImage'), async (request, response, next) => {
db.getUsers()
  .then( users => {
    console.log(users)
    const theUser = users.find(user => request.session.user.id === user.id ? true : false)
    console.log('premodif = ' ,theUser)
    const data = request.body
    const file = request.file
    console.log(request.file, request.files)
    const filename = request.file.fieldname + '-' + Date.now() + path.extname(request.file.originalname)
    theUser.image = '../css/img/' + filename
    console.log('postmodif = ', theUser)

    db.updateUser(theUser)
    rename(request.file.path, path.join(__dirname, '../client/css/img', filename))
     .then(() => response.json({ filename }))
     .catch(next)
  })
})

// app.use((err, req, res, next) => {
//   if (err) {
//     res.json({ message: err.message })
//     console.error(err)
//   }
//   next(err)
// })

app.listen(3456, () => console.log('Port 3456'))
