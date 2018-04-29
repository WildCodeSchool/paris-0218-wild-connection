/* global fetch */

//login in
const formLogin = document.getElementById('sendlogin')

const logIn = passport => {
return fetch("http://localhost:3456/login", {
  method: 'POST',
  body: JSON.stringify(passport)
})
.then(res => res.json())
}

formLogin.addEventListener('click', event => {
  event.preventDefault()
  const inputs = {
    user: window.document.getElementById('user-login').value,
    password: window.document.getElementById('password-login').value,
  }
  logIn(inputs)
})



// sign up
const form = window.document.getElementById('signup-form')

const signup = credentials => {
  return fetch("http://localhost:3456/login", {
    method: 'POST',
    body: credentials
  })
}

form.addEventListener('submit', event => {
  event.preventDefault()
  const inputs = {
    password: window.document.getElementById('password').value,
    passwordBis: window.document.getElementById('password-bis').value,
  }
  console.log(inputs)

  if (inputs.password && inputs.password === inputs.passwordBis) {
    const formdata = new FormData(form)
    signup(formdata)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  } else {
    console.log('Wrong entry')
  }
})

