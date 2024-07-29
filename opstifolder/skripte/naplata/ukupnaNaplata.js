import { izračunajKoličinuKorpe, korpa } from "../../podaci/korpa.js";
import { proizvodi } from "../../podaci/proizvodi.js";
import { formatiranjeValute } from "../../alatke/rsdFormat.js";
import { opcijeDostave } from "../../podaci/opcijePošiljke.js"
import { dodajPorudzbinu } from "../../podaci/porudžbine.js"

export function renderovanjeUkupneNaplate(){
  let generisaniHTML = '';
  let korpaKoličina = izračunajKoličinuKorpe();
  let ukupniDinari = 0;
  let dostavaDinari = 0;
  korpa.forEach(korpaArtikal => {
    const proizvodId = korpaArtikal.proizvodId;
    const proizvodkoličina = korpaArtikal.količina;
    const opcijeDostaveId = korpaArtikal.opcijeDostaveId;
    proizvodi.forEach(proizvod => {
      if(proizvod.id === proizvodId){
        let ceneDinari = proizvod.cenaDinari
        ukupniDinari += proizvodkoličina * ceneDinari;

      }
    });
    opcijeDostave.forEach(opcija => {
      if(opcija.id === opcijeDostaveId){
        dostavaDinari+=opcija.ceneDinari *proizvodkoličina;
      }
    });
  });
  const ukupnoPrePDV = dostavaDinari+ukupniDinari;
  const pdvDinari = ukupnoPrePDV * 0.1;
  const ukupnoPoslePDV =  ukupnoPrePDV + pdvDinari
  
  dostavaDinari = dostavaDinari === 0 ? 'Besplatna dostava' : `${formatiranjeValute(dostavaDinari)}  <span class="rsd-stil">RSD</span>`;
  generisaniHTML = `
  <div class="pregled-naplate-naslov">
    Porudžbina:
  </div>

  <div class="pregled-naplate-red">
    <div>Broj artikala (${korpaKoličina}):</div>
    <div class="pregled-naplate-novac">${formatiranjeValute(ukupniDinari)} <span class="rsd-stil">RSD</span></div>
  </div>

  <div class="pregled-naplate-red">
    <div>Dostava:</div>
    <div class="pregled-naplate-novac js-pregled-naplate-novac">${dostavaDinari}</div>
  </div>

  <div class="pregled-naplate-red sumarni-iznos-red">
    <div>Cena pre PDV-a:</div>
    <div class="pregled-naplate-novac">${formatiranjeValute(ukupnoPrePDV)} <span class="rsd-stil">RSD</span></div>
  </div>

  <div class="pregled-naplate-red">
    <div>Cena PDV (10%):</div>
    <div class="pregled-naplate-novac">${formatiranjeValute(pdvDinari)} <span class="rsd-stil">RSD</span></div>
  </div>

  <div class="pregled-naplate-red ukupno-red">
    <div>Ukupna cena:</div>
    <div class="pregled-naplate-novac js-test-ukupna-cena">${formatiranjeValute(ukupnoPoslePDV)} <span class="rsd-stil">RSD</span></div>
  </div>

  <button class="mesto-porudžbine-dugme glavno-dugme js-mesto-porudžbine">
    Poruči
  </button>`;
  document.querySelector('.js-pregled-naplate').innerHTML= generisaniHTML;
  
  document.querySelector('.js-mesto-porudžbine').addEventListener('click', async () => {
    try {
      const podaciNarudzbine = {
        korpa: korpa,
        ukupnoPoslePDV: ukupnoPoslePDV
      };
  
      const response = await fetch('http://127.0.0.1:3000/market.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(podaciNarudzbine)
      });
  
      const porudzbina = await response.json();
      dodajPorudzbinu(porudzbina);
  
    } catch (error) {
      console.log('Neočekivana greška, molimo pokušajte ponovo kasnije.');
    }
  
    window.location.href = 'porudžbine.html';
  });  
};