export const showUser = fullUser => `

  <div class='${fullUser.color} opacity' id='${fullUser.id}'>
    <div class="header">
    <div class='centered round'><img class='profile-pic center-pic' src='${fullUser.image}'></div>
    </div>
    <div class='name font-modal'>
      <div><p>${fullUser.firstName} ${fullUser.lastName}</p></div>
      <div><p>${fullUser.campus}</p></div>
      <div><p>${fullUser.promo}</p></div>
      <div><p>${fullUser.description}</p></div>
    </div>
  </div>
`
