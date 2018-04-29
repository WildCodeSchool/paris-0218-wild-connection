const path = require('path')
const jasondir = path.join(__dirname, '/json')
const jasondirJob = path.join(__dirname, '/json')

const randomId = () => Math.random().toString(36).slice(2, 6)

const users = [
  require(path.join(jasondir, 'user1.json')),
  require(path.join(jasondir, 'user2.json')),
  require(path.join(jasondir, 'user3.json')),
  require(path.join(jasondir, 'user4.json')),
  require(path.join(jasondir, 'user5.json')),
]

const jobs = [
  {
    "id": "w6o615",
    "city": "The Shire",
    "salaryRange": "500 écus ",
    "contract": "Internship",
    "title": "Jardinier de Frodon ",
    "companyName": "Cul-de-sac SAS",
    "description": "Remplacer sam qui s'est fait disrespect par frodon dans le mordor"
  }
]


const getUsers = () => Promise.resolve(users)

const addUser = user => {
  user.id = randomId()
  users.push(user)

  return Promise.resolve()  
}

const getJobs = () => Promise.resolve(jobs)

const addJob = job => {
  job.id = randomId()
  jobs.push(job)

  return Promise.resolve()  
}

module.exports = {
  getUsers,
  addUser,
  getJobs,
  addJob,
}