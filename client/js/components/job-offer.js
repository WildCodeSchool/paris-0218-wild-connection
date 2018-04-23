export const createJobOffer = jobOffer => `
<div class='job' id='${jobOffer.idJob}'>
  <div>
    <h3>${jobOffer.jobTitle}</h3>
      <p><i class="fas fa-handshake"></i></span> ${jobOffer.contract}</p>
      <p><span><i class="fab fa-fly"></i></i></span> ${jobOffer.city}</p>
      <p><span><i class="fas fa-euro-sign"></i></span> ${jobOffer.salaryRange}</p>
      <p><i class="fas fa-hand-spock"></i> ${jobOffer.description}</p>
  </div>
</div>
`