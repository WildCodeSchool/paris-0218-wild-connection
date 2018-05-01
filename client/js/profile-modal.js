const modal = document.getElementById('modal')

const openModal = () => {
  modal.style.display = 'block'
}

const clickOutside = e => {
  if (e.target === modal) {
    modal.style.display = 'none'
  }
}

window.addEventListener('click', clickOutside)

modalBtn.addEventListener('click', openModal)
