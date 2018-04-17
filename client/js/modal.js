// Récupération de la div contenant l'ensemble du modal formulaire
const modal = document.getElementById('simple_modal')
// Récupération du bouton pour afficher le modal
const modalBtn = document.getElementById('modal_btn')
// Récupération du bouton pour fermer la fenêtre modal
const closeBtn = document.getElementsByClassName('close_btn')[0]

// Function pour afficher le modal :
// on affiche la div modal (class="modal"), définie dans le css comme display 'none'
// grâce au JS qui va changer le style 'none' à 'block' avec l'addEventListenir(click, openModal)
const openModal = () => {
  modal.style.display = 'block'
}

const closeModal = () => {
  modal.style.display = 'none'
}

const clickOutside = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none'
  }
}

// Activer l'affichage du modal en display 'block' suite à l'event 'click'
modalBtn.addEventListener('click', openModal)

// Fermer la fenêtre du modal en passant du display 'block' au display 'none' suite à l'event click sur la croix : <span class="closeBtn">&times;</span>
closeBtn.addEventListener('click', closeModal)

// Permet de fermer la fenêtre modal en cliquant en dehors de la fenêtre
window.addEventListener('click', clickOutside)

let i = 1
let elem = 1
while (elem != null) {
  if ((elem = document.getElementById('job' + i)) == null)
{
console.log('job' + i)
  break
}
  elem.addEventListener('click', openModal)
  console.log(elem)
  i++
}
