import {korpa, dodajUKorpu,izracunajKolicinuKorpe} from "../podaci/korpa.js"; // imports a const korpa from korpa.js, created module
import {proizvodi,ucitavanjeProizvoda} from "../podaci/proizvodi.js";
import {formatiranjeValute} from "./alatke/rsdFormat.js";

ucitavanjeProizvoda().then(()=>{       
  renderProductsGrid();
});

function renderProductsGrid(){

  azurirajKorpaKolicinu();

  let proizvodiHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = proizvodi;

  if(search){
    filteredProducts = proizvodi.filter((proizvod)=>{  

      const nameMatch = proizvod.naziv.toLowerCase().includes(search);
      let keywordMatch = null;

      proizvod.ključneReči.forEach((keyword)=>{
        if(keyword.includes(search)){
          keywordMatch = proizvod;
        }
      });
      
      return nameMatch || keywordMatch;
    });
  };

  //gets proizvodi from proizvodi.js and generates html 
  filteredProducts.forEach((proizvod)=>{
    proizvodiHTML += `
      <div class="proizvod-container">
      <div class="proizvod-slika-container">
        <img class="proizvod-slika"
          src="${proizvod.slika}">
      </div>

      <div class="proizvod-ime limit-text-to-2-lines">
        ${proizvod.naziv}
      </div>

      <div class="proizvod-rating-container">
        <img class="proizvod-rating-stars"
          src="${proizvod.uzmiZvezdiceUrl()}">
        <div class="proizvod-rating-count link-primarni">
          ${proizvod.uzmiOcenu()}
        </div>
      </div>

      <div class="proizvod-cena">
        ${proizvod.uzmiCenu()}
      </div>

      <div class="proizvod-kolicina-container">
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

      <div class="proizvod-spacer"></div>

      <div class="added-to-korpa js-add-korpa-${proizvod.id}">
        <img src="slike/ikonice/kvacica.png">
        Dodato u korpu
      </div>

      <button class="add-to-korpa-button glavno-dugme js-add-button" data-proizvod-id="${proizvod.id}">
        Dodaj u korpu
      </button>
    </div>`
  });

  document.querySelector('.js-proizvodi-kontejner').innerHTML = proizvodiHTML;

  function searchBar(){
    const searchValue = document.querySelector('.js-traka-za-pretragu').value;
    const search = searchValue.toLowerCase();
    window.location.href = `market.html?search=${search}`;
  }

  document.querySelector('.js-dugme-za-pretragu').addEventListener('click',()=>{
    searchBar();
  });

  document.querySelector('.js-traka-za-pretragu').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
      searchBar();
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
        addMsgElement.classList.add('added-to-korpa-clicked');                // and then give it a class with opacity 1
        
        if (timeoutObject.timeoutId){               //if true, it means that interval exists, clear it else -> skip it
          clearTimeout(timeoutObject.timeoutId);
        }
        timeoutObject.timeoutId = setTimeout(()=>{        //removes class and return opacity to 0 in 2000ms 
          addMsgElement.classList.remove('added-to-korpa-clicked');      //it also stores interval into timeoutObject
        },2000);                                      //so if we press it again we can clear interval with if statemant
  }

  //adds event listeners to add buttons
  document.querySelectorAll('.js-add-button')
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