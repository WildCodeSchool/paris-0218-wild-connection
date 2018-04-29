const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const db = require('./db-fs.js')

const secret = 'secret'

const app = express()

// MIDDLEWARES

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


// ROUTES

app.get('/', (request, response) => {
  response.json('ok')
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

app.get('/users', (request, response, next) => {
  db.getUsers()
    .then(users => response.json(users))
    .catch(next)
})

app.get('/jobs', (request, response) => {
  db.getJobs()
    .then(jobs => response.json(jobs))
    .catch(next)
})

app.post('/jobs', (request, response) => {
  const job = req.body

  db.addJob(job)
    .then(response.json('ok'))
    .catch(next)
})

app.get('/profil', (request, response) => {
  response.json('setting profiles')
})

app.listen(3456, () => console.log('Port 3456'))
