const express = require('express')
const path = require('path')
const util = require('util')
const fs = require('fs')

const writeFile = util.promisify(fs.writeFile)
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

const jasondir = __dirname + '/json/'
const wildjob = require('./wildjob-mock.json')

const app = express()

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

  const content = {
    id: id,
    mail: request.body.mail,
    password: request.body.password,
    // default values
    firstName: 'Bob',
    lastName: 'Marley',
    campus: 'Paris',
    promo: '2013',
    month: 'fevrier'
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
    id: idJob,
    contract: request.body.contract,
    city: request.body.city,
    begDate: request.body.begDate,
    endDate: request.body.endDate,
    title: request.body.title,
    companyName: request.body.companyName,
    description: request.body.description
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

app.listen(3456, () => console.log('Port 3456'))
