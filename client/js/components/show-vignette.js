export const showVignette = vignette =>
`  <div class="modal-content">
      <div class="modal-header vignette-title">
        <h3>${vignette.title}</h3>
      </div>
      <div class="form-content">
          <p><span><img src="./pictures/contract.png" class="img-vign"></i></span><span>${vignette.contract}</span></p>
          <p><span><img src="./pictures/place.png" class="img-vign"></span><span>${vignette.city}</span></p>
          <p><span><img src="./pictures/dolls.png" class="img-vign"></span><span>${vignette.salaryRange}</span></p>
          <p><span><img src="./pictures/contractbis.png" class="img-vign"><span><span>${vignette.description}</span></p>
      </div>
        <div class="modal-footer">
          <p>Footer</p>
        </div>
      </div>
`


// export const showVignette = vignette =>
// `  <div class="modal-content">
//       <div class="modal-header vignette-title">
//         <h3>${vignette.title}</h3>
//       </div>
//       <div class="form-content">
//           <p><span vignette-description><i class="fas fa-handshake></i></span><span>${vignette.contract}</span></p>
//           <p><span><i class="fab fa-fly"></i></span><span class="vignette-description">${vignette.city}</span></p>
//           <p><span><i class="fas fa-euro-sign"></i></span><span class="vignette-description">${vignette.salaryRange}</span></p>
//           <p><span><i class="fas fa-hand-spock"></i><span><span class="vignette-description">${vignette.description}</span></p>
//       </div>
//         <div class="modal-footer">
//           <p>Footer</p>
//         </div>
//       </div>
// `