
export function renderCheckoutHeader(){
  let generatedHTML = '';
  generatedHTML= `
    <div class="header-content">
    <div class="checkout-header-left-section">
      <a href="/">
        <img class="beli-logo" src="slike/logo-black.png">
        <img class="beli-logo-telefon" src="slike/logo-black-mobile.png">
      </a>
    </div>

    <div class="checkout-header-middle-section">
      Stranica za naplatu (<a class="return-to-home-link js-return-to-home-link"
        href="/"></a>)
    </div>

    <div class="checkout-header-right-section">
      <img src="slike/ikonice/naplata-kljuc-ikonica.png">
    </div>
  </div>`
  document.querySelector('.js-checkout-header').innerHTML = generatedHTML;
}