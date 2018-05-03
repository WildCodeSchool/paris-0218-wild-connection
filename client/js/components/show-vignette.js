export const showVignette = vignette =>
  `  <div class="modal-content">
      <div class="modal-header vignette-title">
        <h3>${vignette.title} at ${vignette.companyName} </h3>
      </div>
      <div class="form-content">
          <p><span><img src="./pictures/contract.png" class="img-vign"></i></span><span>${vignette.contract}</span></p>
          <p><span><img src="./pictures/place.png" class="img-vign"></span><span>${vignette.city}</span></p>
          <p><span><img src="./pictures/dolls.png" class="img-vign"></span><span>${vignette.salaryRange}</span></p>
          <p><span><img src="./pictures/contractbis.png" class="img-vign"><span><span>${vignette.description}</span></p>
          <p><span><img src="./pictures/mail.png" class="img-vign"><span><span>${vignette.contact}</span></p>
      </div>
      </div>
`