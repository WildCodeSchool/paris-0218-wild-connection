fetch('http://localhost:9000/wildbook')
.then(response => response.json())
.then(jason => {
	console.log(jason)
	let i = 0
	while (jason[i]){
		document.getElementById('info').innerHTML += 
		`<div>
		<div class="profile">
		<div class="profilePic"><img src="http://via.placeholder.com/120x150"></div>
		<div class="name">
		<div><p>${jason[i].lastName}</p></div>
		<div><p>${jason[i].firstName}</p></div>
		<div><p>${jason[i].campus}</p></div>
		<div><p>${jason[i].promo}</p></div>
		</div>
		</div>
		<div>
		`
		i++
	}
})