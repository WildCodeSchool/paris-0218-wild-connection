window.fetch("http://localhost:3456/", {'credentials': 'include'}) 


window.document.getElementById('updateProfileForm').addEventListener('submit', event => {
	window.event.preventDefault()
	const newProfile = {
  	email: window.document.getElementById('mail').value,
  	password: window.document.getElementById('password').value,
  	firstName: window.document.getElementById('first-name').value,
  	lastName: window.document.getElementById('last-name').value,
  	campus: window.document.getElementById('campus').value,
  	promo: window.document.getElementById('promo').value,
  	language: window.document.getElementById('select-idiom').value,
  	country: window.document.getElementById('select-country').value,
  	github: window.document.getElementById('github').value,
  	linkedin: window.document.getElementById('linkdin').value
	}
	console.log(newProfile)
	fetch("http://localhost:3456/myProfile", 
	{
		method : "post",
    headers: {'Content-Type': 'application/json'},
	 	body : JSON.stringify(newProfile)
	}, 
	{'credentials': 'include'})
})