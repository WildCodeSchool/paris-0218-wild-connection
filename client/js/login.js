/* global fetch */

//login in
const formLogin = document.getElementById('sendlogin')

const logIn = passport => {
return fetch("http://localhost:3456/auth", {
    method: 'post',
    headers: {'Content-Type': 'application/json',},
    'credentials': 'include',
    body: JSON.stringify(passport)
  })
}

formLogin.addEventListener('submit', event => {
  event.preventDefault()

  const inputs = {
    mail: window.document.getElementById('user-login').value,
    password: window.document.getElementById('password-login').value,
  }

  logIn(inputs)
  .then(res => res.json())
  .then(res => console.log(res))
})

// sign up
const form = window.document.getElementById('signup-form')

const signup = credentials => {
  console.log(credentials)
  return fetch("http://localhost:3456/login", {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    'credentials': 'include',
    body: JSON.stringify(credentials)
  })
}

form.addEventListener('submit', event => {
  event.preventDefault()
  const inputs = {
    mail:window.document.getElementById('mail').value,
    password: window.document.getElementById('password').value,
    passwordBis: window.document.getElementById('password-bis').value,
  }
  if (inputs.password && inputs.password === inputs.passwordBis) {
    signup(inputs)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  } else {
    console.log('Wrong entry')
  }

fetch('http://localhost:3456/', { 'credentials': 'include' })
  .then(res => res.json())
})
