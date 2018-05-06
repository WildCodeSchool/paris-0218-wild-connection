document.getElementById('logout').addEventListener('click', event => {
	fetch('http://localhost:3456/logout', {'credentials': 'include'})
	window.location.replace('http://localhost:5000/html/login.html')
})
