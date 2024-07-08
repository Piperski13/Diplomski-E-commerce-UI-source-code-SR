import { izracunajKolicinuKorpe, korpa } from "../../podaci/korpa.js";
import { proizvodi } from "../../podaci/proizvodi.js";
import { formatCurrency } from "../../alatke/rsdFormat.js";
import { opcijeDostave } from "../../podaci/opcijePosiljke.js"
import { addOrder } from "../../podaci/porudzbine.js"

export function renderovanjeUkupneNaplate(){
  let generatedHTML = '';
  let korpakolicina = izracunajKolicinuKorpe();
  let totalCents = 0;
  let shippingCents = 0;
  korpa.forEach(korpaArtikal => {
    const proizvodId = korpaArtikal.proizvodId;
    const productkolicina = korpaArtikal.kolicina;
    const opcijeDostaveId = korpaArtikal.opcijeDostaveId;
    proizvodi.forEach(product => {
      if(product.id === proizvodId){
        let ceneDinari = product.cenaDinari
        totalCents += productkolicina * ceneDinari;

      }
    });
    opcijeDostave.forEach(option => {
      if(option.id === opcijeDostaveId){
        shippingCents+=option.ceneDinari *productkolicina;
      }
    });
  });
  const totalBeforeTax = shippingCents+totalCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalAfterTax =  totalBeforeTax + taxCents
  
  shippingCents = shippingCents === 0 ? 'Besplatna dostava' : `${formatCurrency(shippingCents)}  <span class="rsd-stil">RSD</span>`;
  generatedHTML = `
  <div class="pregled-naplate-title">
    Porudžbina:
  </div>

  <div class="pregled-naplate-row">
    <div>Broj artikala (${korpakolicina}):</div>
    <div class="pregled-naplate-money">${formatCurrency(totalCents)} <span class="rsd-stil">RSD</span></div>
  </div>

  <div class="pregled-naplate-row">
    <div>Dostava:</div>
    <div class="pregled-naplate-money js-test-shipping-price">${shippingCents}</div>
  </div>

  <div class="pregled-naplate-row subtotal-row">
    <div>Cena pre PDV-a:</div>
    <div class="pregled-naplate-money">${formatCurrency(totalBeforeTax)} <span class="rsd-stil">RSD</span></div>
  </div>

  <div class="pregled-naplate-row">
    <div>Cena PDV (10%):</div>
    <div class="pregled-naplate-money">${formatCurrency(taxCents)} <span class="rsd-stil">RSD</span></div>
  </div>

  <div class="pregled-naplate-row total-row">
    <div>Ukupna cena:</div>
    <div class="pregled-naplate-money js-test-total-price">${formatCurrency(totalAfterTax)} <span class="rsd-stil">RSD</span></div>
  </div>

  <button class="place-order-button button-primary js-place-order">
    Poruči
  </button>`;
  document.querySelector('.js-pregled-naplate').innerHTML= generatedHTML;
  
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      const payload = {
        korpa: korpa,
        totalAfterTax: totalAfterTax
      };
  
      const response = await fetch('http://127.0.0.1:3000/market.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const order = await response.json();
      addOrder(order);
  
    } catch (error) {
      console.log('Unexpected error, try again later.');
    }
  
    window.location.href = 'porudzbine.html';
  });  
};