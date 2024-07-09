import {porudzbine,izbrisiIzPorudzbine} from '../../podaci/porudzbine.js';
import {formatiranjeValute} from '../../alatke/rsdFormat.js';
import {prikaziDatumNarudzbine} from '../../alatke/datum.js';
import {ucitavanjeProizvoda,proizvodi} from '../../podaci/proizvodi.js';
import {dodajUKorpu, izracunajKolicinuKorpe} from '../../podaci/korpa.js';

console.log(porudzbine);

ucitavanjeProizvoda().then(()=>{     
  renderovanjeUkupnePorudzbine();
});

function renderovanjeUkupnePorudzbine(){
  let generisaniHTML = '';
  let generatedDetailsHTML = '';

  porudzbine.forEach(porudzbina => {

    porudzbina.proizvodi.forEach(productOrder =>{
      let odgovarajuciProizvod;

      proizvodi.forEach(proizvod => {
        if(proizvod.id === productOrder.proizvodId){
          odgovarajuciProizvod = proizvod;
        }
      });
     
      generatedDetailsHTML += `
          <div class="porudzbina-details-grid">
            <div class="proizvod-slika-container">
              <img src=${odgovarajuciProizvod.slika}>
            </div>

            <div class="proizvod-details">
              <div class="proizvod-ime">
                ${odgovarajuciProizvod.naziv}
              </div>
              <div class="proizvod-dostava-datum">
                Dolazak: ${prikaziDatumNarudzbine(productOrder.estimatedDeliveryTime)}
              </div>
              <div class="proizvod-kolicina">
                Količina: ${productOrder.kolicina}
              </div>
              <button class="kupi-ponovo-button glavno-dugme js-kupi-ponovo"
              data-proizvod-id="${odgovarajuciProizvod.id}">
                <img class="kupi-ponovo-icon" src="slike/ikonice/kupi-ponovo.png">
                <span class="kupi-ponovo-message">Kupi ponovo</span>
              </button>
            </div>

            <div class="proizvod-actions">
              <a href="pracenje.html?porudzbinaId=${porudzbina.id}&proizvodId=${odgovarajuciProizvod.id}">
                <button class="track-package-button button-secondary">
                  Praćenje paketa
                </button>
              </a>
            </div>
          </div>
      `;
    });
    function returnGeneratedDetails(generatedDetailsHTML){
      return generatedDetailsHTML;
    }
    generisaniHTML += `
        <div class="porudzbina-container js-porudzbine-item-container-${porudzbina.id}">
          <div class="porudzbina-header">
            <div class="porudzbina-header-left-section">
              <div class="porudzbina-date">
                <div class="porudzbina-header-label">Naručeno datuma:</div>
                <div>${prikaziDatumNarudzbine(porudzbina.vremePorudzbine)}</div>
              </div>
              <div class="porudzbina-total">
                <div class="porudzbina-header-label">Ukupno:</div>
                <div>${formatiranjeValute(porudzbina.totalCostCents)} <span class="rsd-stil">RSD</span></div>
              </div>
            </div>

            <div class="porudzbina-header-right-section">
              <div class="porudzbina-header-label">ID Porudžbine:</div>
              <div>${porudzbina.id}</div>
            </div>
            <button class="remove-porudzbina js-remove-porudzbina" data-proizvod-id="${porudzbina.id}">X</button>
          </div>
          ${returnGeneratedDetails(generatedDetailsHTML)}
        </div>
    `;
    generatedDetailsHTML = '';
  });
  document.querySelector('.js-porudzbine-gird').innerHTML = generisaniHTML;
  azurirajKorpaKolicinu();

  document.querySelectorAll('.js-kupi-ponovo').forEach((button)=>{
    button.addEventListener('click',()=>{
      const proizvodId = button.dataset.proizvodId;
      dodajUKorpu(proizvodId);
      azurirajKorpaKolicinu();
    })
  })

  document.querySelectorAll('.js-remove-porudzbina').forEach((button)=>{
    button.addEventListener('click',()=>{
      const porudzbinaId = button.dataset.proizvodId;
      izbrisiIzPorudzbine(porudzbinaId);
      const kontejner = document.querySelector(`.js-porudzbine-item-container-${porudzbinaId}`);
      kontejner.remove();
      renderovanjeUkupnePorudzbine();
    })
  })

  function azurirajKorpaKolicinu(){        
    let korpaKolicina = izracunajKolicinuKorpe();   //korpa.js function that calculates korpa kolicina
    if(!korpaKolicina){          //essentialy break a function if korpaKolicina undefined
      return;
    }
    document.querySelector('.js-kolicina-u-kolicima').innerHTML = korpaKolicina;
  }
};

console.log(porudzbine); // number of porudzbine
// console.log(porudzbine[1].proizvodi); //index 1 all proizvodi array
// console.log(porudzbine[0].proizvodi[0].proizvodId);


