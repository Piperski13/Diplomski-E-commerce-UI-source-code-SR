
export function renderovanjeNaplateZaglavlje(){
  let generisaniHTML = '';
  generisaniHTML= `
    <div class="zagavlje-sadrzaj">
    <div class="naplata-zaglavlje-leva-sekcija">
      <a href="/">
        <img class="beli-logo" src="slike/crni-logo.png">
        <img class="beli-logo-telefon" src="slike/ceni-logo-telefon.png">
      </a>
    </div>

    <div class="naplata-zaglavlje-srednja-sekcija">
      Stranica za naplatu (<a class="povratak-na-market-link js-povratak-na-market-link"
        href="/"></a>)
    </div>

    <div class="naplata-zaglavlje-desna-sekcija">
      <img src="slike/ikonice/naplata-kljuc-ikonica.png">
    </div>
  </div>`
  document.querySelector('.js-naplata-zaglavlje').innerHTML = generisaniHTML;
}