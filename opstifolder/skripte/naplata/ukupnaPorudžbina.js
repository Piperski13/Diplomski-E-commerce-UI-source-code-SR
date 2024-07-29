import {korpa,
  izbrišiIZKorpe,
  izračunajKoličinuKorpe,
  ažurirajKoličinu,
  ažurirajOpcijeDostave}
   from "../../podaci/korpa.js";
import {proizvodi} from "../../podaci/proizvodi.js"
import {formatiranjeValute} from "../../alatke/rsdFormat.js";
import {opcijeDostave,izracunajDatumDostave} from "../../podaci/opcijePošiljke.js"
import { renderovanjeUkupneNaplate } from "./ukupnaNaplata.js";

export function renderovanjeUkupnePorudžbine(){
  function dogadjajTastature(proizvodId){
    document.querySelectorAll('.količina-unos').forEach((unos)=>{
      unos.addEventListener('keydown',(e)=>{
        if(e.key==='Enter'){
          const artikalKontejner = document.querySelector(`.js-korpa-artikal-kontejner-${proizvodId}`);
          artikalKontejner.classList.remove('azuriranje-kolicine-u-toku');
          azurirajUnos(proizvodId);
        }
      });
    });
  };
  let naplataHTML = '';
  korpa.forEach(korpaArtikal => {
    const proizvodId = korpaArtikal.proizvodId;
    let odgovarajuciProizvod;

    proizvodi.forEach(proizvod => {
      if(proizvod.id === proizvodId){
        odgovarajuciProizvod = proizvod;
      }
    });

    const opcijeDostaveId = korpaArtikal.opcijeDostaveId;
    let odgovarajucaDostava;
    opcijeDostave.forEach(opcija => {
      if(opcija.id === opcijeDostaveId){
        odgovarajucaDostava = opcija;
      }
    });
    const formatiranDatum = izracunajDatumDostave(odgovarajucaDostava.dostaveDani);
    naplataHTML += 
    `<div class="js-korpa-artikal-kontejner-${odgovarajuciProizvod.id} 
      js-test-korpa-proizvod-kontejner">

        <div class="dostava-datum">
          Datum isporuke: ${formatiranDatum}
        </div>

      <div class="korpa-artikal-detalji-grid">
        <img class="proizvod-slika"
          src="${odgovarajuciProizvod.slika}">

        <div class="korpa-artikal-detalji">
          <div class="proizvod-ime js-test-proizvod-ime-${odgovarajuciProizvod.id}">
            ${odgovarajuciProizvod.naziv}
          </div>
          <div class="proizvod-cena js-test-proizvod-cena-${odgovarajuciProizvod.id}">
            ${odgovarajuciProizvod.uzmiCenu()}
          </div>
          <div class="proizvod-količina">
            <span class="js-test-proizvod-količina-${odgovarajuciProizvod.id}">
              Količina: <span class="količina-label">
              ${korpaArtikal.količina}
              </span>
            </span>
            <span class="azuriraj-kolicinu-link link-primarni js-azuriraj-link" 
            data-proizvod-id="${odgovarajuciProizvod.id}">
              Ažuriraj
            </span>
            <input type="text" class="količina-unos js-količina-unos-${odgovarajuciProizvod.id}">
            <span class="sacuvaj-kolicinu-link link-primarni js-sacuvaj-link"
            data-proizvod-id="${odgovarajuciProizvod.id}">Sačuvaj</span>

            <span class="izbrisi-kolicinu-link link-primarni js-izbrisi-link 
            js-izbrisi-test-${odgovarajuciProizvod.id}" 
            data-proizvod-id="${odgovarajuciProizvod.id}">
              Obriši
            </span>
          </div>
        </div>

        <div class="dostava-opcije">
          <div class="dostava-opcije-naslov">
            Izaberite opciju isporuke:
          </div>
          ${opcijeDostaveHTML(odgovarajuciProizvod,korpaArtikal)}
        </div>
      </div>
    </div>`;
  });
  //generates dostava html
  function opcijeDostaveHTML(odgovarajuciProizvod,korpaArtikal){
    let generisaniHTML='';
    opcijeDostave.forEach((opcija) =>{
      const formatiranDatum = izracunajDatumDostave(opcija.dostaveDani);
      const cenaRecenice = opcija.ceneDinari === 0 ? 'Besplatna dostava' : `${formatiranjeValute(opcija.ceneDinari)} <span class="rsd-stil">RSD</span> - Dostava`;
      const CekiranoJe = opcija.id === korpaArtikal.opcijeDostaveId;
      generisaniHTML +=
      `<div class="dostava-opcija js-dostava-opcija
      js-test-dostava-opcija-${odgovarajuciProizvod.id}-${opcija.id}"
      data-proizvod-id="${odgovarajuciProizvod.id}"
      data-dostava-id="${opcija.id}">
        <input type="radio"
          ${CekiranoJe ? 'checked' : ''}
          class="dostava-opcija-unos 
          js-test-dostava-opcija-unos-${odgovarajuciProizvod.id}-${opcija.id}"
          name="dostava-opcija-${odgovarajuciProizvod.id}">
        <div>
          <div class="dostava-opcija-datum">
            ${formatiranDatum}
          </div>
          <div class="dostava-opcija-cena">
            ${cenaRecenice}
          </div>
        </div>
      </div>`;
    })
    return generisaniHTML;
  }
  function azurirajKorpaKolicinu(){ 
    let korpaKoličina = izračunajKoličinuKorpe();     
    if(korpaKoličina === 0){
      document.querySelector('.js-povratak-na-market-link').innerHTML = ``;
    }
    else if(korpaKoličina === 1){
      document.querySelector('.js-povratak-na-market-link').innerHTML = `${korpaKoličina} artikal`;
    }
    else{
      document.querySelector('.js-povratak-na-market-link').innerHTML = `${korpaKoličina} artikla`;
    }
  };

  function proizvodkoličinaAzuriranje(){
    const potvrdiDa = document.querySelector('.potvrdi-prozor-da');
    const potvrdiNe = document.querySelector('.potvrdi-prozor-ne');

    document.querySelectorAll('.js-izbrisi-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const proizvodId = link.dataset.proizvodId;
        const prozorPotvrde = document.getElementById('potvrdi-brisanje');
        prozorPotvrde.classList.toggle('potvrdi-skriveno');

        function obradiPotvrduDa(){
          
          prozorPotvrde.classList.toggle('potvrdi-skriveno');
          potvrdiDa.removeEventListener('click',obradiPotvrduDa);
          potvrdiNe.removeEventListener('click',obradiPotvrduNe);
          izbrisiKontejner(proizvodId);
        }
        function obradiPotvrduNe(){
          prozorPotvrde.classList.toggle('potvrdi-skriveno');
          potvrdiDa.removeEventListener('click',obradiPotvrduDa);
          potvrdiNe.removeEventListener('click',obradiPotvrduNe);
        }

        potvrdiDa.addEventListener('click',obradiPotvrduDa);
        potvrdiNe.addEventListener('click',obradiPotvrduNe);
      });
    });
  
    
    document.querySelectorAll('.js-azuriraj-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const proizvodId = link.dataset.proizvodId;
        const artikalKontejner = document.querySelector(`.js-korpa-artikal-kontejner-${proizvodId}`);
        artikalKontejner.classList.add('azuriranje-kolicine-u-toku');
        dogadjajTastature(proizvodId);
      });
    });
  }

  function sacuvajLinkDogadjaj(){
    document.querySelectorAll('.js-sacuvaj-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const proizvodId = link.dataset.proizvodId;
        const artikalKontejner = document.querySelector(`.js-korpa-artikal-kontejner-${proizvodId}`);
        artikalKontejner.classList.remove('azuriranje-kolicine-u-toku');
        azurirajUnos(proizvodId);
      });
    });
  }
  
  function izbrisiKontejner(proizvodId){
    izbrišiIZKorpe(proizvodId);
    const kontejner = document.querySelector(`.js-korpa-artikal-kontejner-${proizvodId}`);
    kontejner.remove();
    azurirajKorpaKolicinu();
    renderovanjeUkupneNaplate();
  }
  function azurirajUnos(proizvodId){
    const količinaImput = document.querySelector(`.js-količina-unos-${proizvodId}`)
    let novaKoličina = Number(količinaImput.value);
    if(novaKoličina === 0){
      izbrisiKontejner(proizvodId);
      ažurirajKoličinu(proizvodId,novaKoličina);
      renderovanjeUkupnePorudžbine();
      renderovanjeUkupneNaplate();
    }
    if(novaKoličina>=1000 || novaKoličina<0){
      alert('Greška pri unosu');
      renderovanjeUkupnePorudžbine();
    }
    else{
      ažurirajKoličinu(proizvodId,novaKoličina);
      renderovanjeUkupnePorudžbine();
      renderovanjeUkupneNaplate();
    }
  }
  function dostavaAzuriranje(){
    document.querySelectorAll('.js-dostava-opcija').forEach(option=>{
      option.addEventListener('click',()=>{
        const proizvodId = option.dataset.proizvodId;
        const opcijeDostaveId = option.dataset.dostavaId;
        ažurirajOpcijeDostave(proizvodId,opcijeDostaveId);
        renderovanjeUkupnePorudžbine();
        renderovanjeUkupneNaplate(); 
      })
    })
  }

  document.querySelector('.pregled-porudžbine').innerHTML = naplataHTML;

  azurirajKorpaKolicinu(); 
  proizvodkoličinaAzuriranje();  
  sacuvajLinkDogadjaj();        
  dostavaAzuriranje(); 
}