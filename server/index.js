const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const mysql = require('mysql2/promise')

const db = require('./db-fs.js')

const secret = 'secret'

const app = express()

// Middlewear
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
  response.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(session({
  secret,
  saveUninitialized: true,
  resave: true,
  store: new FileStore({ secret }),
}))

app.use((request, response, next) => {
  console.log(`${request.method} ${request.url}`)
  next()
})

// // create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'wildConnection'
// }).then(connection => {
// // simple query
//   return connection.query('SELECT * FROM user')  
// })
//     .then(console.log, console.error)

// const writeFile = util.promisify(fs.writeFile)
// const readdir = util.promisify(fs.readdir)
// const readFile = util.promisify(fs.readFile)

// const jasondir = __dirname + "/json/"
// const jasondirJob = __dirname + "/json-job/"

// let allUsers

// readdir(jasondir)
// .then(files => files.map(file => jasondir + file))
// .then(paths => {
//   allUser = Promise.all(paths.map(path => readFile(path, 'utf8').then(JSON.parse)))
//     .then(users => {
//       allUsers = users
//     })
//   })    

// routes

app.get('/', (request, response) => {
  response.send('ok')
})

// sign-up
app.post('/login', (request, response, next) => {
  const random = Math.floor(Math.random() * 5)
  const user = {
    mail: request.body.mail,
    password: request.body.password,
    // default values
    firstName: "Jason",
    lastName: "Du Place-Holder",
    campus: "Paris",
    promo: "2013",
    month: "fevrier",
    color: `profil-colors${random}`
  }

  db.addUser(user)
    .then(response.json('ok'))
    .catch(next)    
})

db.getUsers().then(console.log)

app.get('/users', (request, response, next) => {
  db.getUsers()
    .then(users => response.json(users))
    .catch(next)
})

db.getJobs().then(console.log)
app.get('/jobs', (request, response, next) => {
  db.getJobs()
  .then(jobs => response.json(jobs))
  .catch(next)  
})

app.post('/jobs', (request, response, next) => {
  const job = request.body
  
db.addJob(job)
    .then(response.json ('ok'))
    .catch(next)
})

app.listen(3456, () => console.log('Port 3456'))
