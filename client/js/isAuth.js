	fetch('http://localhost:3456/', {'credentials': 'include'})
	.then (res => res.json)
	.then (res => if (res !== 'Ok') window.location.replace('http://localhost:5000/html/login.html'))
})