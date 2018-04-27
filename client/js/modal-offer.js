const modal = document.getElementById('simple-modal-bis')

const closeBtn = document.getElementsByClassName('close-btn')[0]


// const openModal = () => {
//   modal.style.display = 'block'
// }

const closeModal = () => {
  modal.style.display = 'none'
}

const clickOutside = e => {
  if (e.target === modal) {
    modal.style.display = 'none'
  }
}

closeBtn.addEventListener('click', closeModal)

window.addEventListener('click', clickOutside)


// modalBtn.addEventListener('click', openModal)