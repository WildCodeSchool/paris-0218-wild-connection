const mysql = require('mysql2/promise')
// create the connection to database
const co = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'wildConnection'
})

const exec = async (query, params) => {
  const connection = await co

  return connection.execute(query, params)
    .then(result => result[0])
}

const getUsers = () => exec('SELECT * FROM user')

const addUser = user => {
  const keys = [ 'email', 'password' ]

  const query = `INSERT INTO user (${keys.join(', ')}) VALUES (${Array(keys.length).fill('?').join(', ')})`
  const params = keys.map(key => user[key])

  // console.log(query, params)
  return exec(query, params) 
}


const updateUser = (user, id) => {
  const keys = [ 'firstName', 'lastName', 'email', 'password', 'campus', 'promo', 'image' ]

  const keyvalues = keys
    .map(key => ({ key, value: user[key] }))
    .filter(kv => kv.value !== undefined)

  const query = `UPDATE user SET ${keyvalues.map(kv => `${kv.key} = ?`).join(', ')} WHERE id = ?`
  const params = [ ...keyvalues.map(kv => kv.value), id ]

  console.log(query, params)
  return exec(query, params)
}

const getJobs = () => exec('SELECT * FROM jobOffers')

const addJob  = job => {
  const keys = [ 'userID','firstName','lastName','email','city','salaryRange','contract','title','companyName','description',]
  const query = `INSERT INTO jobOffers (${keys.join(', ')}) VALUES (${Array(keys.length).fill('?').join(', ')})`
  const params = keys.map(key => job[key])

  // console.log(query, params)
  return exec(query, params) 
}

const updateJob = (job, id) => {
  const keys = [ 'firstName','lastName','email','city','salaryRange','contract','title','companyName','description',]
  const keyvalues = keys
    .map(key => ({ key, value: job[key] }))
    .filter(kv => kv.value !== undefined)

  const query = `UPDATE jobOffers SET ${keyvalues.map(kv => `${kv.key} = ?`).join(', ')} WHERE id = ?`
  const params = [ ...keyvalues.map(kv => kv.value), id ]

  console.log(query, params)
  return exec(query, params)
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  getJobs,
  addJob,
  updateJob
}

// TESTS

// addUser({ email: 'yo@ann.fr', password: 'pwd' }).then(console.log, console.error)
// updateUser({ firstName: 'Yoann', lastName: 'Cribier', promo: '2018', campus: undefined }, 3).then(console.log, console.error)
// addJob({ userID: '2', firstName: 'Mehdi', lastName:'Chtira', email: 'qwe@WSAEDQUOT.fr',city: 'le Mans', salaryRange: 10, contract: 'cdi', title: 'cherche larbin',companyName: 'wcs', description: 'Larbin' }).then(console.log, console.error)
// updateJob({ firstName: 'Yoann', lastName: 'Cribier', description: 'serveur chez Do-Mac' }, 3).then(console.log, console.error)

