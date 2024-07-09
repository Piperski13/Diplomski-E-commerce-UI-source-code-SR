import {proizvodi,ucitavanjeProizvoda} from '../../podaci/proizvodi.js';
import {porudzbine} from '../../podaci/porudzbine.js';
import {pprikaziDatumNarudzbinePracenje,trakaNapretka} from '../../alatke/datum.js';
import {izracunajKolicinuKorpe} from "../../podaci/korpa.js"

const url = new URL(window.location.href);
console.log(url.searchParams.get('porudzbinaId'));
console.log(url.searchParams.get('proizvodId'));

// ucitavanjeProizvoda().then(()=>{
//   renderTrackingPage();
// })

async function renderTrackingPage(){
  await ucitavanjeProizvoda();

  let odgovarajuciProizvod;
  let matchingOrder;
  let matchingdatumPorudzbine;

  const madeOrderId = url.searchParams.get('porudzbinaId');
  const productOrderId = url.searchParams.get('proizvodId');

  porudzbine.forEach(porudzbina => {
    if(porudzbina.id === madeOrderId){

      matchingOrder = porudzbina;
      matchingdatumPorudzbine = porudzbina;

      matchingOrder.proizvodi.forEach(porucenProizvod => {
        if(porucenProizvod.proizvodId === productOrderId){
          matchingOrder = porucenProizvod;
        }
      });
    }
  });
    
  proizvodi.forEach(proizvod => {
    if(proizvod.id === productOrderId ){
      odgovarajuciProizvod = proizvod;
    }
  });

  const progressionDelivery = trakaNapretka(matchingdatumPorudzbine.vremePorudzbine,matchingOrder.procenjenoVremeIsporuke);
  // console.log(`matchingdatumPorudzbine.vremePorudzbine: ${matchingdatumPorudzbine.vremePorudzbine}`);
  // console.log(`matchingOrder.procenjenoVremeIsporuke: ${matchingOrder.procenjenoVremeIsporuke}`);
  // console.log(`progressionDelivery: ${progressionDelivery}`);

  let generisaniHTML = `
     <div class="porudzbina-tracking">
        <a class="back-to-porudzbine-link link-primarni" href="porudzbine.html">
          Pogledajte sve porudžbine 
        </a>

        <div class="dostava-datum">
          Dolazak u: ${pprikaziDatumNarudzbinePracenje(matchingOrder.procenjenoVremeIsporuke)}
        </div>

        <div class="proizvod-info">
          ${odgovarajuciProizvod.naziv}
        </div>

        <div class="proizvod-info">
          Količina: ${matchingOrder.kolicina}
        </div>

        <img class="proizvod-slika" src="${odgovarajuciProizvod.slika}">

        <div class="progress-labels-container">
          <div class="progress-label ${progressionDelivery <=49 ? 'current-status' : '' }" >
            Priprema
          </div>
          <div class="progress-label 
          ${progressionDelivery >49 && progressionDelivery <=99 ? 'current-status' : '' }">
            Isporučen
          </div>
          <div class="progress-label ${progressionDelivery >=100 ? 'current-status' : '' }">
            Dostavljen
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" 
          style="
          width:${progressionDelivery}%"></div>
        </div>
      </div>
  `;
  document.querySelector('.glavni-sadrzaj').innerHTML = generisaniHTML;
  azurirajKorpaKolicinu();

  function azurirajKorpaKolicinu(){        
    let korpaKolicina = izracunajKolicinuKorpe();   //korpa.js function that calculates korpa kolicina
    if(!korpaKolicina){          //essentialy break a function if korpaKolicina undefined
      return;
    }
    document.querySelector('.js-kolicina-u-kolicima').innerHTML = korpaKolicina;
  }
};
renderTrackingPage();