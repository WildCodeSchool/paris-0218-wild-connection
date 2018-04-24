/* global fetch */

import { createUserElement } from './components/user.js'

let users = []

const usersContainer = document.getElementById('users')
const filtersSubmitButton = document.getElementById('filter-form-submit-button')

const openModal = user => {
  document.getElementById('modal')
}

const inject = users => {
  const userElements = users.map(createUserElement).join('')

  usersContainer.innerHTML = userElements !== '' ? userElements : 'No users found'

  const profileElements = Array.from(document.getElementsByClassName('profile'))

  profileElements.forEach((profileElement, i) => profileElement.addEventListener('click', () => openModal(users[i])))
}

const filterUsers = users => {
  let search = document.getElementById('search-bar').value
  console.log(search)
  
  const filters = {
    campus: document.getElementById('campus').value,
    promo: document.getElementById('promo').value,
    techno: document.getElementById('techno').value,
  }

  const byFilters = user => {
    if ((!filters.promo || filters.promo.toLowerCase() === user.promo.toLowerCase())
      && (!filters.campus || filters.campus.toLowerCase() === user.campus.toLowerCase())
    ) {
      return true
    }
    return false
  }

  users = users.filter(byFilters)

  if (search !== '') {
    search = search.toLowerCase().split(' ')
    let i = 0
    while (search[i]) {
      users = users.filter(profile => {
        if (profile.promo.toLowerCase() === search[i] 
          || profile.campus.toLowerCase() === search[i] 
          || profile.firstName.toLowerCase() === search[i] 
          || profile.lastName.toLowerCase() === search[i]) {
          return true
      }
      return false
    })
      i++
    }
  }

  return users
}

filtersSubmitButton.addEventListener('click', event => {
  event.preventDefault()

  const filteredUsers = filterUsers(users)

  inject(filteredUsers)
})

fetch('http://localhost:3456/users')
  .then(response => response.json())
  .then(fetchedUsers => {
    users = fetchedUsers
    
    inject(users)
  })