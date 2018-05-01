/* global fetch */

import { createJobOffer } from './components/job-offer.js'
import { showVignette } from './components/show-vignette.js'

let jobs = []

const jobContainer = document.getElementById('job-container')

const modal = document.getElementById('simple-modal')
const modalBis = document.getElementById('simple-modal-bis')

const filterJobSubmitBtn = document.getElementById('filter-job-submit-button')

// const openModal = () => {
//   modal.style.display = 'block'
// }

const openModalBis = (job) => {
  modalBis.style.display = 'block'

  modalBis.innerHTML = showVignette(job)

  console.log(job)
}

const injectJob = jobs => {
  const jobElements = jobs.map(createJobOffer).join('')

  jobContainer.innerHTML = jobElements !== '' ? jobElements : 'no match for your research'

  const offerElements = Array.from(document.getElementsByClassName('job'))

  offerElements.forEach((element, i) => element.addEventListener('click', () => openModalBis(jobs[i])))
}

const filterJob = jobs => {
  const search = document.getElementById('search-bar').value

  const filters = {
    city: document.getElementById('city').value,
    contract: document.getElementById('contract').value,
    skills: document.getElementById('skills').value
  }

  const byfilters = jobs => {
    if ((!filters.city || filters.city.toLowerCase() === jobs.city.toLowerCase()) &&
      (!filters.contract || filters.contract.toLowerCase() === jobs.contract.toLowerCase()) &&
      (!filters.skills || filters.skills.toLowerCase() === jobs.skills.toLowerCase())
    ) {
      return true
    }

    return false
  }

  return jobs.filter(byfilters)
}

filterJobSubmitBtn.addEventListener('click', event => {
  event.preventDefault()

  const filteredJob = filterJob(jobs)

  inject(filteredJob)
})

fetch('http://localhost:3456/jobs', {'credentials': 'include'})
  .then(response => response.json())
  .then(fetchedJobs => {
    jobs = fetchedJobs
    console.log(jobs)
    injectJob(jobs)
  })

// https://osvaldas.info/real-time-search-in-javascript

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search

// https://www.w3schools.com/jsref/event_onkeyup.asp
