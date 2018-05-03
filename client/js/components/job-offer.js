export const createJobOffer = jobOffer => `
<div class='job box' id='${jobOffer.idJob}'>
  <div class="offer-width">
    <div class="vign-title">
    <h3 class="title-vignette">${jobOffer.title} at ${jobOffer.companyName} </h3>
    </div>
    
    <div class="margin-vign">
      <p>
      	<span><img src="./pictures/contract.png" class="img-vign"></span>
      	<span>${jobOffer.contract}</span>
      </p>
   
      <p>
      	<span><img src="./pictures/place.png" class="img-vign"></i></i></span>
      	<span>${jobOffer.city}</span>
      </p>

      <p>
      	<span><img src="./pictures/billets.png" class="img-vign"></i></span>
      	<span>${jobOffer.salaryRange}</span>
      </p>

      <p>
      	<span><img src="./pictures/company.png" class="img-vign"></span>
      	<span>${jobOffer.companyName}</span>
      </p>
    </div>
  
  </div>
</div>
`
