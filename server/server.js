const express = require('express')
const app = express()
const wildjob = require('./wildjob-mock.json')
const path = require('path')
const util = require('util')
const fs = require('fs')
const writeFile = util.promisify(fs.writeFile)
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const jasondir = __dirname + "/json/"
const array = []

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

app.get('/', (request, response) => {
  response.send("Bienvenue sur notre site trop cool. Y'aura un formulaire d'inscription ici plus tard")
})

app.get('/login', (request, response) => {
  response.send('Bienvenue login')
})

app.post('/login', (request, response) => {
  let id = Math.random().toString(36).slice(2, 6)
  let filename = `/json/${id}.json`
  const dirpath = path.join(__dirname, filename)
  const form = {
    id: id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    mail: request.body.mail,
    password: request.body.password,
    passwordBis: request.body.passwordBis,
    campus: request.body.campus,
    promo: request.body.promo,
    month: request.body.month
  }

  writeFile(dirpath, JSON.stringify(form, null, 2), 'utf8')
    .then(response.send('ok'))
   // .catch(err => response.status(404).end('404'))
})

app.get('/wildjob', (request, response) => {
  response.send('hey les offres')
})

app.post('/wildjob', (request, response) => {
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

app.get('/wildbook', (request, response) => {
  readdir(jasondir)
    .then(users => users.map(user => jasondir + user))
    .then(users => {
      users.forEach(user => array.push(readFile(user, 'utf8')))
      Promise.all(array)
        .then(array => response.json(array))
  })  
    
})

app.listen(3456, () => console.log('Port 3456'))
