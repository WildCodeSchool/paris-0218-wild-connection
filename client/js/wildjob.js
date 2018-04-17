// cf voir const modal & const openModal dans le fichier modal.js
const modal = document.getElementById('simple-modal')
const openModal = () => {
  modal.style.display = 'block'
  // console.log('t ou')
}

window.fetch('http://localhost:9000/wildjob')
  .then(res => res.json())
  .then(json => {
    let nbElements = 0
    json.forEach(json => {
      document.getElementById('vignette').innerHTML +=
      `<div class="job" id="job${json.id}">
      <div>
      <h3>${json.jobTitle}</h3>
      <p><i class="fas fa-handshake"></i></span> ${json.contract}</p>
      <p><span><i class="fab fa-fly"></i></i></span> ${json.city}</p>
      <p><span><i class="fas fa-euro-sign"></i></span> ${json.salaryRange}</p>
      <p><i class="fas fa-hand-spock"></i> ${json.description}</p>
      </div>
      </div>`
      nbElements++
    })
    let div = document.getElementById('vignette').querySelectorAll('.job')
    for (let i = 0; i < nbElements; i++) {
      let elem = div[i]
      console.log(div[i])
      elem.addEventListener('click', openModal)
    }

    document.getElementById('value').addEventListener('click', () => {
      window.event.preventDefault()
      let contract = document.getElementById('contract').value
      let skills = document.getElementById('skills').value
      let city = document.getElementById('city').value
      let searchBar = document.getElementById('search-bar').value

      let fullJson = json

      fullJson = json.filter(job => {
        if ((job.contract === contract || contract === 'Contract') &&
          (job.skills === skills || skills === 'Skills') &&
          (job.city === city || city === 'City')) {
          return true
        } else {
          return false
        }
      })

      if (searchBar !== []) {
        let i = 0
        searchBar = searchBar.split(',')
        while (searchBar[i]) {
          let trim = searchBar[i].trim()
          fullJson = fullJson.filter((filterjson) => {
            if (trim === filterjson.contract) {
              return true
            } else if (trim === filterjson.city) {
              return true
            } else if (trim === filterjson.skills) {
              return true
            } else {
              return false
            }
          })
          i++
        }
      }

      document.getElementById('vignette').innerHTML = ''

      let nbElements = 0
      fullJson.forEach(filterjson => {
        document.getElementById('vignette').innerHTML +=
        `<div class="job" id="job${filterjson.id}">
        <div>
        <h3> ${filterjson.jobTitle} </h3>
        <p><i class="fas fa-handshake"></i></span> ${filterjson.contract}</p>
        <p><span><i class="fab fa-fly"></i></i></span> ${filterjson.city}</p>
        <p><span><i class="fas fa-euro-sign"></i></span> ${filterjson.salaryRange}</p>
        <p><i class="fas fa-hand-spock"></i> ${filterjson.description}</p>
        </div>
        </div>`
        nbElements++
      })
      let div = document.getElementById('vignette').querySelectorAll('.job')
      for (let i = 0; i < nbElements; i++) {
        let elem = div[i]
        elem.addEventListener('click', openModal)
      }
    })
  })

// https://osvaldas.info/real-time-search-in-javascript

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search

// https://www.w3schools.com/jsref/event_onkeyup.asp
