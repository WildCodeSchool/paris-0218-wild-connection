/* global fetch */

import { createJobOffer } from './components/job-offer.js'

let jobs = []

const jobContainer = document.getElementById('job-container')
const filterJobSubmitBtn = document.getElementById('filter-job-submit-button')

const modal = document.getElementById('simple-modal')
const openModal = () => {
  modal.style.display = 'block'
}

const injectJob = jobs => {
  
  const jobElements = jobs.map(createJobOffer).join('')
  
  jobContainer.innerHTML = jobElements !== '' ? jobElements : 'no match for your research'
  
  const offerElements = Array.from(document.getElementsByClassName('job'))

  offerElements.forEach((offElements, i) => offElements.addEventListener('click', () => openModal(jobs[i])))

}

const filterJob = jobs => {
  const search = document.getElementById('search-bar').value

  const filters = {
    city: document.getElementById('city').value,
    contract: document.getElementById('contract').value,
    skills: document.getElementById('skills').value,
  }

  const byfilters = jobs => {
    if ((!filters.city || filters.city.toLowerCase() === jobs.city.toLowerCase())
      && (!filters.contract || filters.contract.toLowerCase() === jobs.contract.toLowerCase())
      && (!filters.skills || filters.skills.toLowerCase() === filters.skills.toLowerCase())
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

fetch('http://localhost:3456/jobs')
  .then(response => response.json())
  .then(fetchedJobs => {
    jobs = fetchedJobs
console.log(jobs)
    injectJob(jobs)
  })


// https://osvaldas.info/real-time-search-in-javascript

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search

// https://www.w3schools.com/jsref/event_onkeyup.asp
