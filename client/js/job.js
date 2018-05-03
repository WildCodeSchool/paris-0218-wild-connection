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

const fillJobData = ( job, form ) => {
  const formElements = Array.from( form.querySelectorAll( 'input,select,textarea' ) )
  formElements.forEach( element => {
    if ( element.name && job.hasOwnProperty( element.name ) ) {
      element.value = job[ element.name ]
    }
  } )
}

const openModalBis = (job) => {
  modalBis.style.display = 'block'

  modalBis.innerHTML = showVignette(job)

  modalBis.querySelector( '.edit-job-button' ).addEventListener( 'click', event => {
    modalBis.style.display = 'none'
    modal.style.display = 'block'
    const form = modal.querySelector('#submit-job');
    fillJobData(job, form)
  })

  console.log(job)
}

const injectJob = jobs => {
  
  const jobElements = jobs.map(createJobOffer).join('') 
  
  jobContainer.innerHTML = jobElements !== '' ? jobElements : 'Sorry, no match for your research'
  
  const offerElements = Array.from(document.getElementsByClassName('job'))

  offerElements.forEach((element, i) => element.addEventListener('click', () => openModalBis(jobs[i])))
}

const filterJob = jobs => {
  let filteredJobs = jobs;

  const search = document.getElementById('search-bar').value

  filteredJobs = filteredJobs.filter( job => job.title && job.title.toLowerCase().includes( search ) )

  const filters = {
    city: document.getElementById('city').value,
    contract: document.getElementById('contract').value,
    skills: document.getElementById('skills').value
  }

  Object.keys(filters).forEach(filterName => {
    const filterValue = filters[filterName];
    if ( ! filterValue ) {
      return;
    }
    filteredJobs = filteredJobs.filter(job => {
      return job[filterName] && job[filterName].toLowerCase() === filterValue.toLowerCase();
    })
  })

  return filteredJobs;
}

filterJobSubmitBtn.addEventListener('click', event => {
  event.preventDefault()

  const filteredJob = filterJob(jobs)

  injectJob(filteredJob)
})

document.addEventListener("DOMContentLoaded", function(event) {
  fetch('http://localhost:3456/jobs', {'credentials': 'include'})
    .then(response => response.json())
    .then(fetchedJobs => {
      jobs = fetchedJobs
      console.log(jobs)
      injectJob(jobs)
    })
})

// https://osvaldas.info/real-time-search-in-javascript

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search

// https://www.w3schools.com/jsref/event_onkeyup.asp
