import {korpa, dodajUKorpu,izracunajKolicinuKorpe} from "../podaci/korpa.js"; // imports a const korpa from korpa.js, created module
import {proizvodi,ucitavanjeProizvoda} from "../podaci/proizvodi.js";


ucitavanjeProizvoda().then(()=>{       
  renederujProizvodeGrid();
});

function renederujProizvodeGrid(){
  
  azurirajKorpaKolicinu();

  let proizvodiHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filtriraniProizvodi = proizvodi;

  if(search){
    filtriraniProizvodi = proizvodi.filter((proizvod)=>{  

      const podudaranjeImena = proizvod.naziv.toLowerCase().includes(search);
      let podudaranjeTastature = null;

      proizvod.ključneReči.forEach((kljucnaRec)=>{
        if(kljucnaRec.includes(search)){
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

      <div class="dodato-u-korpu js-add-korpa-${proizvod.id}">
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
    const search = vrednostPretrage.toLowerCase();
    window.location.href = `market.html?search=${search}`;
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

  function addedTokorpaGreen(proizvodId,timeoutObject){     // pop up msg function
    let addMsgElement = document.querySelector(`.js-add-korpa-${proizvodId}`);    //target add korpa div with opacity 0
        addMsgElement.classList.add('dodato-u-korpu-clicked');                // and then give it a class with opacity 1
        
        if (timeoutObject.timeoutId){               //if true, it means that interval exists, clear it else -> skip it
          clearTimeout(timeoutObject.timeoutId);
        }
        timeoutObject.timeoutId = setTimeout(()=>{        //removes class and return opacity to 0 in 2000ms 
          addMsgElement.classList.remove('dodato-u-korpu-clicked');      //it also stores interval into timeoutObject
        },2000);                                      //so if we press it again we can clear interval with if statemant
  }

  //adds event listeners to add buttons
  document.querySelectorAll('.js-dodaj-dugme')
    .forEach((button)=>{      
      let addedMessageTimeouts = {};                           //create a object for checking interval addedTokorpaGreen
      button.addEventListener('click',()=>{
        const proizvodId = button.dataset.proizvodId;   //on click save data-proizvod-id in a const
        console.log(proizvodId);
        dodajUKorpu(proizvodId);
        addedTokorpaGreen(proizvodId,addedMessageTimeouts);  // for a green pop up msg function
        azurirajKorpaKolicinu();
      });
  });
};