export const showUser = fullUser => `

  <div class='${fullUser.color} opacity' id='${fullUser.id}'>
    <div class="header">
    <div class='centered round'><img class='profile-pic center-pic' src='${fullUser.image}'></div>
    </div>
    <div class='name font-modal'>
      <div><p>${fullUser.firstName} ${fullUser.lastName}</p></div>
      <div><p>${fullUser.campus}</p></div>
      <div><p>${fullUser.promo}</p></div>
      <div><p>${fullUser.email}</p></div>
      <div><p>Github: ${fullUser.github}</p></div>
      <div><p>Linkkdin: ${fullUser.linkdin}</p></div>
      <div><p>Country: ${fullUser.country}</p></div>

    </div>
  </div>
`
