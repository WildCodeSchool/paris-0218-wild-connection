/* global fetch */

const form = window.document.getElementById('signup-form')

const signup = (credentials) => {
  return fetch("http://localhost:3456/login", {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  .then(res => res.json())
}

form.addEventListener('submit', event => {
  event.preventDefault()
  
  const inputs = {
    mail: window.document.getElementById('mail').value,
    password: window.document.getElementById('password').value,
    passwordBis: window.document.getElementById('password-bis').value,
  }

  if (inputs.password === inputs.passwordBis) {
    const credentials = {
      mail: inputs.mail,
      password: inputs.password
    }

    signup(credentials)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    
  } else {
    console.log('Wrong entry')
  } 
  
})