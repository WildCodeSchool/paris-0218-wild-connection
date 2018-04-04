let i = 0


while (jason[i]){
	document.getElementById('info').innerHTML += 
	`<div>
	<div class="profile">
	<div class="round"><img class="profilePic" src="../css/img/deer.png"></div>
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

