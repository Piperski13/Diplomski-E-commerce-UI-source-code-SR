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
  let generisaniDetaljiHTML = '';

  porudzbine.forEach(porudzbina => {

    porudzbina.proizvodi.forEach(porucenProizvod =>{
      let odgovarajuciProizvod;

      proizvodi.forEach(proizvod => {
        if(proizvod.id === porucenProizvod.proizvodId){
          odgovarajuciProizvod = proizvod;
        }
      });
     
      generisaniDetaljiHTML += `
          <div class="porudzbina-detalji-grid">
            <div class="proizvod-slika-kontejner">
              <img src=${odgovarajuciProizvod.slika}>
            </div>

            <div class="proizvod-detalji">
              <div class="proizvod-ime">
                ${odgovarajuciProizvod.naziv}
              </div>
              <div class="proizvod-dostava-datum">
                Dolazak: ${prikaziDatumNarudzbine(porucenProizvod.procenjenoVremeIsporuke)}
              </div>
              <div class="proizvod-kolicina">
                Količina: ${porucenProizvod.kolicina}
              </div>
              <button class="kupi-ponovo-dugme glavno-dugme js-kupi-ponovo"
              data-proizvod-id="${odgovarajuciProizvod.id}">
                <img class="kupi-ponovo-ikonica" src="slike/ikonice/kupi-ponovo.png">
                <span class="kupi-ponovo-poruka">Kupi ponovo</span>
              </button>
            </div>

            <div class="proizvod-akcije">
              <a href="pracenje.html?porudzbinaId=${porudzbina.id}&proizvodId=${odgovarajuciProizvod.id}">
                <button class="pracenje-paketa-dugme dugme-sekundarno">
                  Praćenje paketa
                </button>
              </a>
            </div>
          </div>
      `;
    });
    function povratakGenerisanihDetalja(generisaniDetaljiHTML){
      return generisaniDetaljiHTML;
    }
    generisaniHTML += `
        <div class="porudzbina-kontejner js-porudzbine-artikal-kontejner-${porudzbina.id}">
          <div class="porudzbina-zaglavlje">
            <div class="porudzbina-zaglavlje-leva-sekcija">
              <div class="porudzbina-datum">
                <div class="porudzbina-zaglavlje-label">Naručeno datuma:</div>
                <div>${prikaziDatumNarudzbine(porudzbina.vremePorudzbine)}</div>
              </div>
              <div class="ukupna-porudzbina">
                <div class="porudzbina-zaglavlje-label">Ukupno:</div>
                <div>${formatiranjeValute(porudzbina.totalCostCents)} <span class="rsd-stil">RSD</span></div>
              </div>
            </div>

            <div class="porudzbina-zaglavlje-desna-sekcija">
              <div class="porudzbina-zaglavlje-label">ID Porudžbine:</div>
              <div>${porudzbina.id}</div>
            </div>
            <button class="izbrisi-porudzbinu js-izbrisi-porudzbinu" data-proizvod-id="${porudzbina.id}">X</button>
          </div>
          ${povratakGenerisanihDetalja(generisaniDetaljiHTML)}
        </div>
    `;
    generisaniDetaljiHTML = '';
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

  document.querySelectorAll('.js-izbrisi-porudzbinu').forEach((button)=>{
    button.addEventListener('click',()=>{
      const porudzbinaId = button.dataset.proizvodId;
      izbrisiIzPorudzbine(porudzbinaId);
      const kontejner = document.querySelector(`.js-porudzbine-artikal-kontejner-${porudzbinaId}`);
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


