const express = require('express')
const jason = require('./jason.json')
const wildjob = require('./wildjob-mock.json')
const path = require('path')
const util = require('util')
const fs = require('fs')
const writeFile = util.promisify(fs.writeFile)
const readdir = util.promisify(fs.readdir)
// trop precious
const readFile = util.promisify(fs.readFile)

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

app.get('/', (request, response) => {
  response.send("Bienvenue sur notre site trop cool. Y'aura un formulaire d'inscription ici plus tard")
})

app.get('/login', (request, response) => {
  response.send('Bienvenue login')
})

app.post('/login', (request, response) => {
  let id = Math.random().toString(36).slice(2, 6)
  let filename = `${id}.json`
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
    .then(response.send('ok')
      .catch(err))
})

app.get('/wildjob', (request, response) => {
  response.json(wildjob)
})

app.get('/wildbook', (request, response) => {
  response.json(jason)
})

app.listen(3456, () => console.log('Port 3456'))
