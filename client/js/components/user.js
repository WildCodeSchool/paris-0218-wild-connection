export const createUserElement = user => `
<div>
  <div class='profile' id='${user.id}'>
    <div class='round'><img class='profile-pic' src='../css/img/deer.png'></div>
    <div class='name'>
      <div><p>${user.firstName}</p></div>
      <div><p>${user.lastName}</p></div>
      <div><p>${user.campus}</p></div>
      <div><p>${user.promo}</p></div>
    </div>
  </div>
</div>
`
