window.fetch('http://localhost:9000/wildbook')
  .then(response => jason = response.json())
  .then(jason => {

        /* injection des profiles en arrivant sur la pages */
        document.getElementById('info').innerHTML = ''

        jason.forEach((jason) => {
        document.getElementById('info').innerHTML += 
        `<div>
        <div class="profile">
        <div class="round"><img class="profilePic" src="../css/img/deer.png"></div>
        <div class="name">
        <div><p>${jason.lastName}</p></div>
        <div><p>${jason.firstName}</p></div>
        <div><p>${jason.campus}</p></div>
        <div><p>${jason.promo}</p></div>
        </div>
        </div>
        <div>`
    })
    /* voila !! tout les profiles sont affiché */


    /* injection des profiles après selection de filtre */
    document.getElementById('value').addEventListener('click', () => {
        /* ici je recupere les données du formulaire */
        event.preventDefault()
        let campus = document.getElementById('campus').value
        let promo = document.getElementById('promo').value
        let techno = document.getElementById('techno').value
        let searchBar = document.getElementById('searchBar').value
        let filterjason = jason
        let filterjasonbis

        /* j'applique un filter sur le tableau jason avec les données du formulaire */

        filterjason = jason.filter(profile => {
            if ((profile.promo === promo || promo === "Promo") && (profile.campus === campus || campus === 'Campus'))
                return true
            return false
        })
        
        if (searchBar != []){
            filterjason = filterjason.filter(profile => {
                if ((searchBar.includes(profile.firstName)) || (searchBar.includes(profile.lastName)))
                    return true
                return false
            })
        }

        /* j'efface les profiles affiché au chargement de la page */
        document.getElementById('info').innerHTML = ''

        /* j'injecte le tableau json filtré */
        filterjason.forEach(filterjason => {
            document.getElementById('info').innerHTML += 
            `<div>
            <div class="profile">
            <div class="round"><img class="profilePic" src="../css/img/deer.png"></div>
            <div class="name">
            <div><p>${filterjason.lastName}</p></div>
            <div><p>${filterjason.firstName}</p></div>
            <div><p>${filterjason.campus}</p></div>
            <div><p>${filterjason.promo}</p></div>
            </div>
            </div>
            <div>`
        })

        filterjason = jason
    })
})