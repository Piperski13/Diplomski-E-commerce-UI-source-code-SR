import {korpa, dodajUKorpu,izracunajKolicinuKorpe} from "../podaci/korpa.js"; 
import {proizvodi,ucitavanjeProizvoda} from "../podaci/proizvodi.js";


ucitavanjeProizvoda().then(()=>{       
  renederujProizvodeGrid();
});

function renederujProizvodeGrid(){
  
  azurirajKorpaKolicinu();

  let proizvodiHTML = '';

  const url = new URL(window.location.href);
  const pretraga = url.searchParams.get('pretraga');

  let filtriraniProizvodi = proizvodi;

  if(pretraga){
    filtriraniProizvodi = proizvodi.filter((proizvod)=>{  

      const podudaranjeImena = proizvod.naziv.toLowerCase().includes(pretraga);
      let podudaranjeTastature = null;

      proizvod.ključneReči.forEach((kljucnaRec)=>{
        if(kljucnaRec.includes(pretraga)){
          podudaranjeTastature = proizvod;
        }
      });
      
      return podudaranjeImena || podudaranjeTastature;
    });
  };

  //gets proizvodi from proizvodi.js and generates html 
  filtriraniProizvodi.forEach((proizvod)=>{
    proizvodiHTML += `
      <div class="proizvod-kontejner">
      <div class="proizvod-slika-kontejner">
        <img class="proizvod-slika"
          src="${proizvod.slika}">
      </div>

      <div class="proizvod-ime limitiraj-tekst-na-2-linije">
        ${proizvod.naziv}
      </div>

      <div class="proizvod-ocena-kontejner">
        <img class="proizvod-ocene-zvezde"
          src="${proizvod.uzmiZvezdiceUrl()}">
        <div class="proizvod-ocene-zbir link-primarni">
          ${proizvod.uzmiOcenu()}
        </div>
      </div>

      <div class="proizvod-cena">
        ${proizvod.uzmiCenu()}
      </div>

      <div class="proizvod-kolicina-kontejner">
        <select class="js-izbor-kolicine-${proizvod.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      
      ${proizvod.dodatniInfoHTML()}

      <div class="proizvodni-razmak"></div>

      <div class="dodato-u-korpu js-dodaj-korpa-${proizvod.id}">
        <img src="slike/ikonice/kvacica.png">
        Dodato u korpu
      </div>

      <button class="dodato-u-korpu-dugme glavno-dugme js-dodaj-dugme" data-proizvod-id="${proizvod.id}">
        Dodaj u korpu
      </button>
    </div>`
  });

  document.querySelector('.js-proizvodi-kontejner').innerHTML = proizvodiHTML;

  function trakaZaPretragu(){
    const vrednostPretrage = document.querySelector('.js-traka-za-pretragu').value;
    const pretraga = vrednostPretrage.toLowerCase();
    window.location.href = `market.html?pretraga=${pretraga}`;
  }

  document.querySelector('.js-dugme-za-pretragu').addEventListener('click',()=>{
    trakaZaPretragu();
  });

  document.querySelector('.js-traka-za-pretragu').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
      trakaZaPretragu();
    }
  })

  function azurirajKorpaKolicinu(){        
    let korpaKolicina = izracunajKolicinuKorpe();   //korpa.js function that calculates korpa kolicina
    if(!korpaKolicina){          //essentialy break a function if korpaKolicina undefined
      return;
    }
    document.querySelector('.js-kolicina-u-kolicima').innerHTML = korpaKolicina;
  }

  function dodajUKorpuZeleno(proizvodId,timeoutObjekat){     // pop up msg function
    let dodajPorukuElement = document.querySelector(`.js-dodaj-korpa-${proizvodId}`);    //target add korpa div with opacity 0
        dodajPorukuElement.classList.add('dodato-u-korpu-kliknuto');                // and then give it a class with opacity 1
        
        if (timeoutObjekat.timeoutId){               //if true, it means that interval exists, clear it else -> skip it
          clearTimeout(timeoutObjekat.timeoutId);
        }
        timeoutObjekat.timeoutId = setTimeout(()=>{        //removes class and return opacity to 0 in 2000ms 
          dodajPorukuElement.classList.remove('dodato-u-korpu-kliknuto');      //it also stores interval into timeoutObjekat
        },2000);                                      //so if we press it again we can clear interval with if statemant
  }

  //adds event listeners to add buttons
  document.querySelectorAll('.js-dodaj-dugme')
    .forEach((button)=>{      
      let dodatePorukeTimeouts = {};                           //create a object for checking interval dodajUKorpuZeleno
      button.addEventListener('click',()=>{
        const proizvodId = button.dataset.proizvodId;   //on click save data-proizvod-id in a const
        dodajUKorpu(proizvodId);
        dodajUKorpuZeleno(proizvodId,dodatePorukeTimeouts);  // for a green pop up msg function
        azurirajKorpaKolicinu();
      });
  });
};