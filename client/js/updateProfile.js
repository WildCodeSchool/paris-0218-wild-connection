console.log('Hello World !')
fetch("http://localhost:3456/", {'credentials': 'include',})

window.document.getElementById('global_container').addEventListener('submit', event => {
	event.preventDefault()
	const updatedUser = {
		firstName: window.document.getElementById('first-name').value,
		lastName: window.document.getElementById('last-name').value,
		email: window.document.getElementById('mail').value,
		password: window.document.getElementById('password').value,
		campus: window.document.getElementById('campus').value,
		promo: window.document.getElementById('promo').value,
		language: window.document.getElementById('select-idiom').value,
		country: window.document.getElementById('select-country').value,
		github: window.document.getElementById('github').value,
		linkedin: window.document.getElementById('linkdin').value,
	}
	window.fetch('http://localhost:3456/updateProfile', {
    method: 'post',
    headers: {'Content-Type': 'application/json',},
    'credentials': 'include',
    body: JSON.stringify(updatedUser)
  })
})