const modal = document.getElementById('simple-modal-bis')

const clickOutside = e => {
  if (e.target === modal) {
    modal.style.display = 'none'
  }
}

window.addEventListener('click', clickOutside)
