export const showVignette = vignette =>
`  <div class="modal-content">
      <div class="modal-header">
        <span class="close-btn">&times;</span>
      </div>
        <h3>${vignette.title}</h3>
          <p><i class="fas fa-handshake"></i></span> ${vignette.contract}</p>
          <p><span><i class="fab fa-fly"></i></i></span> ${vignette.city}</p>
          <p><span><i class="fas fa-euro-sign"></i></span> ${vignette.salaryRange}</p>
          <p><i class="fas fa-hand-spock"></i> ${vignette.description}</p>
        <div clas="modal-footer">
          <p>Footer</p>
        </div>
    </div>
`