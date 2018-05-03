const path = require('path')
const util = require('util')
const fs = require('fs')

const writeFile = util.promisify(fs.writeFile)
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

const jasondir = path.join(__dirname, '/json/')
const jasondirJob = path.join(__dirname, '/json-job/')

const randomId = () => Math.random().toString(36).slice(2, 6)

const getUsers = () => {
  return readdir(jasondir)
    .then(files => files.map(file => path.join(jasondir, file)))
    .then(paths => Promise.all(paths.map(path => readFile(path, 'utf8').then(JSON.parse))))
}

const addUser  = user => {
    user.id = randomId()

  const filename = `user-${randomId()}.json`
  const dirpath = path.join(jasondir, filename)

  return writeFile(dirpath, JSON.stringify(user, null, 2), 'utf8')
}

const getJobs = () => {
  return readdir(jasondirJob)
    .then(files => files.map(file => path.join(jasondirJob, file)))
    .then(paths => Promise.all(paths.map(path => readFile(path, 'utf8').then(JSON.parse))))
}

const addJob = job => {
  createdAt = Date.now()
  job.createdAt = createdAt
  job.id = randomId()
  const filename = `job-${createdAt}.json`
  const dirpath = path.join(jasondirJob, filename)

  return writeFile(dirpath, JSON.stringify(job, null, 2), 'utf8')
}

const updateUser = newUser => {
  const filename = `user-${newUser.id}.json`
  const dirpath = path.join(jasondir, filename)

  return writeFile(dirpath, JSON.stringify(newUser, null, 2), 'utf8')
}

module.exports = {
  getUsers,
  addUser,
  getJobs,
  addJob,
  updateUser
}
