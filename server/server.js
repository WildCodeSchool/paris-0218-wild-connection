const express = require('express')
const jason = require('./jason.json')
const app = express()

app.get('/', (request, response) => {
	response.send("Bienvenue sur notre site trop cool. Y'aura un formulaire d'inscription ici plus tard")
})

app.get('/wildjob', (request, response) => {
	response.json("plus tard")
})

app.get('/wildbook', (request, response) => {
	response.json(jason)
})

app.listen(9000, () => console.log("Port 9000"))