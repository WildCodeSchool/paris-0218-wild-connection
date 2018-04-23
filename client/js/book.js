/* global fetch */

import { createUserElement } from './components/user.js'

let users = []

const usersContainer = document.getElementById('users')
const filtersSubmitButton = document.getElementById('filter-form-submit-button')

const openModal = user => {
  console.log(user)
}

const inject = users => {
  const userElements = users.map(createUserElement).join('')

  usersContainer.innerHTML = userElements !== '' ? userElements : 'No users found'

  const profileElements = Array.from(document.getElementsByClassName('profile'))

  profileElements.forEach((profileElement, i) => profileElement.addEventListener('click', () => openModal(users[i])))
}

const searchMatchUser = (search, user) => {
  search = search.toLowerCase()

  return (search === user.firstName.toLowerCase() || search === user.lastName.toLowerCase())
}

const filterUsers = users => {
  const search = document.getElementById('search-bar').value
  
  const filters = {
    campus: document.getElementById('campus').value,
    promo: document.getElementById('promo').value,
    techno: document.getElementById('techno').value,
  }

  const byFilters = user => {
    if ((!filters.promo || filters.promo.toLowerCase() === user.promo.toLowerCase())
      && (!filters.campus || filters.campus.toLowerCase() === user.campus.toLowerCase())
      // && (!filters.techno || filters.techno.toLowerCase() === user.techno.toLowerCase())
      && searchMatchUser(search, user)
    ) {
      return true
    }

    return false
  }

  return users.filter(byFilters)
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