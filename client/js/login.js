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
})

// sign up
const form = window.document.getElementById('signup-form')


const signup = (credentials) => {
  return fetch('http://localhost:3456/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    'credentials': 'include',
    body: JSON.stringify(credentials)
  })
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputs = {
    email: window.document.getElementById('email').value,
    password: window.document.getElementById('password').value,
    passwordBis: window.document.getElementById('password-bis').value
  }
  if (inputs.password && inputs.password === inputs.passwordBis) {
    const credentials = {
      email: inputs.email,
      password: inputs.password
    }

    signup(credentials)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  } else {
    console.log('Wrong entry')
  }

fetch('http://localhost:3456/', { 'credentials': 'include' })
  .then(res => res.json())
})
