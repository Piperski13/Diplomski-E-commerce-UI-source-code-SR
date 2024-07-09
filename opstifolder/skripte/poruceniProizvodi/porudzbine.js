import {porudzbine,removeFromOrders} from '../../podaci/porudzbine.js';
import {formatiranjeValute} from '../../alatke/rsdFormat.js';
import {prikaziDatumNarudzbine} from '../../alatke/datum.js';
import {loadProducts,ucitavanjeProizvoda,proizvodi} from '../../podaci/proizvodi.js';
import {dodajUKorpu, izracunajKolicinuKorpe} from '../../podaci/korpa.js';
console.log(porudzbine);
ucitavanjeProizvoda().then(()=>{          //fetch, returns promise, method then
  renderovanjeUkupnePorudzbine();
});

// loadProducts(renderovanjeUkupnePorudzbine);    //call back , XMLHttpRequest

function renderovanjeUkupnePorudzbine(){
  let generatedHTML = '';
  let generatedDetailsHTML = '';

  porudzbine.forEach(porucbina => {

    porucbina.proizvodi.forEach(productOrder =>{
      let matchingProduct;

      proizvodi.forEach(product => {
        if(product.id === productOrder.proizvodId){
          matchingProduct = product;
        }
      });
     
      generatedDetailsHTML += `
          <div class="porucbina-details-grid">
            <div class="product-image-container">
              <img src=${matchingProduct.slika}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.naziv}
              </div>
              <div class="product-dostava-date">
                Dolazak: ${prikaziDatumNarudzbine(productOrder.estimatedDeliveryTime)}
              </div>
              <div class="product-kolicina">
                Količina: ${productOrder.kolicina}
              </div>
              <button class="kupi-ponovo-button button-primary js-kupi-ponovo"
              data-proizvod-id="${matchingProduct.id}">
                <img class="kupi-ponovo-icon" src="slike/ikonice/kupi-ponovo.png">
                <span class="kupi-ponovo-message">Kupi ponovo</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="pracenje.html?orderId=${porucbina.id}&proizvodId=${matchingProduct.id}">
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
    generatedHTML += `
        <div class="porucbina-container js-porudzbine-item-container-${porucbina.id}">
          <div class="porucbina-header">
            <div class="porucbina-header-left-section">
              <div class="porucbina-date">
                <div class="porucbina-header-label">Naručeno datuma:</div>
                <div>${prikaziDatumNarudzbine(porucbina.vremePorudzbine)}</div>
              </div>
              <div class="porucbina-total">
                <div class="porucbina-header-label">Ukupno:</div>
                <div>${formatiranjeValute(porucbina.totalCostCents)} <span class="rsd-stil">RSD</span></div>
              </div>
            </div>

            <div class="porucbina-header-right-section">
              <div class="porucbina-header-label">ID Porudžbine:</div>
              <div>${porucbina.id}</div>
            </div>
            <button class="remove-porucbina js-remove-porucbina" data-proizvod-id="${porucbina.id}">X</button>
          </div>
          ${returnGeneratedDetails(generatedDetailsHTML)}
        </div>
    `;
    generatedDetailsHTML = '';
  });
  document.querySelector('.js-porudzbine-gird').innerHTML = generatedHTML;
  updatekorpakolicina();

  document.querySelectorAll('.js-kupi-ponovo').forEach((button)=>{
    button.addEventListener('click',()=>{
      const proizvodId = button.dataset.proizvodId;
      dodajUKorpu(proizvodId);
      updatekorpakolicina();
    })
  })

  document.querySelectorAll('.js-remove-porucbina').forEach((button)=>{
    button.addEventListener('click',()=>{
      const orderId = button.dataset.proizvodId;
      removeFromOrders(orderId);
      const container = document.querySelector(`.js-porudzbine-item-container-${orderId}`);
      container.remove();
      renderovanjeUkupnePorudzbine();
    })
  })

  function updatekorpakolicina(){        
    let korpakolicina = izracunajKolicinuKorpe();   //korpa.js function that calculates korpa kolicina
    if(!korpakolicina){          //essentialy break a function if korpakolicina undefined
      return;
    }
    document.querySelector('.js-kolicina-u-kolicima').innerHTML = korpakolicina;
  }
};

console.log(porudzbine); // number of porudzbine
// console.log(porudzbine[1].proizvodi); //index 1 all proizvodi array
// console.log(porudzbine[0].proizvodi[0].proizvodId);


