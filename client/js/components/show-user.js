export const showUser = fullUser => `

  <div class='${fullUser.color}' id='${fullUser.id}'>
    <div class='round'><img class='profile-pic' src='${fullUser.image}'></div>
    <div class='name'>
      <div><p>${fullUser.firstName}</p></div>
      <div><p>${fullUser.lastName}</p></div>
      <div><p>${fullUser.campus}</p></div>
      <div><p>${fullUser.promo}</p></div>
    </div>
  </div>
`