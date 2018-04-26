const form = document.getElementById('avatar-form')

form.addEventListener('submit', e => {
  e.preventDefault()

  const formData = new FormData(form)

  fetch(`http://localhost:3000/upload`, {
    method: 'post',
    body: formData
  })
  .then(res => {
    console.log(res)  
  })
})

// Il faudra creer un fichier upload dans le repo views/public/uploads pour receptionner les fichiers
