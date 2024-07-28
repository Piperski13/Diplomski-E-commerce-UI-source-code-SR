import {proizvodi,ucitavanjeProizvoda} from '../../podaci/proizvodi.js';
import {porudzbine} from '../../podaci/porudzbine.js';
import {prikaziDatumPorudzbinePracenje,trakaNapretka} from '../../alatke/datum.js';
import {izračunajKoličinuKorpe} from "../../podaci/korpa.js"

const url = new URL(window.location.href);
console.log(url.searchParams.get('porudzbinaId'));
console.log(url.searchParams.get('proizvodId'));

async function renderujStranicuZaPracenje(){
  await ucitavanjeProizvoda();

  let odgovarajuciProizvod;
  let odgovarajucaPorudzbina;
  let odgovarajuciDatumPorudzbine;

  const obradjenaPorudzbinaId = url.searchParams.get('porudzbinaId');
  const poruceniProizvodId = url.searchParams.get('proizvodId');

  porudzbine.forEach(porudzbina => {
    if(porudzbina.id === obradjenaPorudzbinaId){

      odgovarajucaPorudzbina = porudzbina;
      odgovarajuciDatumPorudzbine = porudzbina;

      odgovarajucaPorudzbina.proizvodi.forEach(porucenProizvod => {
        if(porucenProizvod.proizvodId === poruceniProizvodId){
          odgovarajucaPorudzbina = porucenProizvod;
        }
      });
    }
  });
    
  proizvodi.forEach(proizvod => {
    if(proizvod.id === poruceniProizvodId ){
      odgovarajuciProizvod = proizvod;
    }
  });

  const napredakDostave = trakaNapretka(odgovarajuciDatumPorudzbine.vremePorudzbine,odgovarajucaPorudzbina.procenjenoVremeIsporuke);

  let generisaniHTML = `
     <div class="porudzbina-pracenje">
        <a class="povratak-na-porudzbine-link link-primarni" href="porudzbine.html">
          Pogledajte sve porudžbine 
        </a>

        <div class="dostava-datum">
          Dolazak u: ${prikaziDatumPorudzbinePracenje(odgovarajucaPorudzbina.procenjenoVremeIsporuke)}
        </div>

        <div class="proizvod-info">
          ${odgovarajuciProizvod.naziv}
        </div>

        <div class="proizvod-info">
          Količina: ${odgovarajucaPorudzbina.količina}
        </div>

        <img class="proizvod-slika" src="${odgovarajuciProizvod.slika}">

        <div class="progress-labels-kontejner">
          <div class="napredak-label ${napredakDostave <=49 ? 'trenutni-status' : '' }" >
            Priprema
          </div>
          <div class="napredak-label 
          ${napredakDostave >49 && napredakDostave <=99 ? 'trenutni-status' : '' }">
            Isporučen
          </div>
          <div class="napredak-label ${napredakDostave >=100 ? 'trenutni-status' : '' }">
            Dostavljen
          </div>
        </div>

        <div class="napredak-traka-kontejner">
          <div class="napredak-traka" 
          style="
          width:${napredakDostave}%"></div>
        </div>
      </div>
  `;
  document.querySelector('.glavni-sadrzaj').innerHTML = generisaniHTML;
  azurirajKorpaKolicinu();

  function azurirajKorpaKolicinu(){        
    let korpaKoličina = izračunajKoličinuKorpe();   //korpa.js function that calculates korpa količina
    if(!korpaKoličina){          //essentialy break a function if korpaKoličina undefined
      return;
    }
    document.querySelector('.js-količina-u-kolicima').innerHTML = korpaKoličina;
  }
};
renderujStranicuZaPracenje();