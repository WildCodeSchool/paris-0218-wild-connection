const express = require('express')
const app = express()
const path = require('path')
const util = require('util')
const fs = require('fs')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const writeFile = util.promisify(fs.writeFile)
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

const jasondir = __dirname + "/json/"
const jasondirJob = __dirname + "/json-job/"

const secret = 'secret'
let allUsers

readdir(jasondir)
.then(files => files.map(file => jasondir + file))
.then(paths => {
  allUser = Promise.all(paths.map(path => readFile(path, 'utf8').then(JSON.parse)))
    .then(users => {
      allUsers = users
    })
  })    

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

app.get('/', (request, response) => {
  response.send('Ok')
})

app.post('/', (request, response) => {
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
    firstName: "Jason",
    lastName: "Du Place-Holder",
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

  if (!content.mail.includes('@')) {
    response.status(500).json('invalid mail')
    return
  }
  
  writeFile(dirpath, JSON.stringify(content, null, 2), 'utf8')
    .then(response.json('ok'))
    .catch(next)

  console.log(request.body)
    
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

app.post('/jobs', (request, response) => {
  const idJob = Math.random().toString(36).slice(2, 8)
  const fileNameJob = `job-${idJob}.json`
  const dirpathJob = path.join(jasondirJob, fileNameJob)
  const contentJob = {
      id : idJob,
      city: request.body.city,
      salaryRange: request.body.salaryRange,
      contract : request.body.contract, 
      title : request.body.title,
      companyName : request.body.companyName,
      description : request.body.description,
  }
  
  console.log(contentJob)
  writeFile(dirpathJob, JSON.stringify(contentJob, null, 2), 'utf8')
    .then(response.send('ok'))
    .catch(next)
})

app.get('/users', (request, response) => {
  response.json(allUsers)
})

app.get('/profil', (request, response) => {
  response.send('setting profiles')
})

app.listen(3456, () => console.log('Port 3456'))
