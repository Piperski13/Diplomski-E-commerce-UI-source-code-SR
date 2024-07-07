
export function renderovanjeNaplateZaglavlje(){
  let generatedHTML = '';
  generatedHTML= `
    <div class="header-content">
    <div class="naplata-zaglavlje-left-section">
      <a href="/">
        <img class="beli-logo" src="slike/crni-logo.png">
        <img class="beli-logo-telefon" src="slike/ceni-logo-telefon.png">
      </a>
    </div>

    <div class="naplata-zaglavlje-middle-section">
      Stranica za naplatu (<a class="return-to-home-link js-return-to-home-link"
        href="/"></a>)
    </div>

    <div class="naplata-zaglavlje-right-section">
      <img src="slike/ikonice/naplata-kljuc-ikonica.png">
    </div>
  </div>`
  document.querySelector('.js-naplata-zaglavlje').innerHTML = generatedHTML;
}