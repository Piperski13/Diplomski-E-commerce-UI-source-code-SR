import {proizvodi,ucitavanjeProizvoda} from '../../podaci/proizvodi.js';
import {orders} from '../../podaci/porudzbine.js';
import {renderDateOrderTracking,progressBar} from '../../alatke/datum.js';
import {izracunajKolicinuKorpe} from "../../podaci/korpa.js"

const url = new URL(window.location.href);
console.log(url.searchParams.get('orderId'));
console.log(url.searchParams.get('proizvodId'));

// ucitavanjeProizvoda().then(()=>{
//   renderTrackingPage();
// })

async function renderTrackingPage(){
  await ucitavanjeProizvoda();

  let matchingProduct;
  let matchingOrder;
  let matchingOrderDate;

  const madeOrderId = url.searchParams.get('orderId');
  const productOrderId = url.searchParams.get('proizvodId');

  orders.forEach(order => {
    if(order.id === madeOrderId){

      matchingOrder = order;
      matchingOrderDate = order;

      matchingOrder.proizvodi.forEach(productOrder => {
        if(productOrder.proizvodId === productOrderId){
          matchingOrder = productOrder;
        }
      });
    }
  });
    
  proizvodi.forEach(product => {
    if(product.id === productOrderId ){
      matchingProduct = product;
    }
  });

  const progressionDelivery = progressBar(matchingOrderDate.orderTime,matchingOrder.estimatedDeliveryTime);
  // console.log(`matchingOrderDate.orderTime: ${matchingOrderDate.orderTime}`);
  // console.log(`matchingOrder.estimatedDeliveryTime: ${matchingOrder.estimatedDeliveryTime}`);
  // console.log(`progressionDelivery: ${progressionDelivery}`);

  let generatedHTML = `
     <div class="order-tracking">
        <a class="back-to-porudzbine-link link-primary" href="porudzbine.html">
          Pogledajte sve porudžbine 
        </a>

        <div class="delivery-date">
          Dolazak u: ${renderDateOrderTracking(matchingOrder.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${matchingProduct.naziv}
        </div>

        <div class="product-info">
          Količina: ${matchingOrder.kolicina}
        </div>

        <img class="product-image" src="${matchingProduct.slika}">

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
  document.querySelector('.glavni-sadrzaj').innerHTML = generatedHTML;
  updatekorpakolicina();

  function updatekorpakolicina(){        
    let korpakolicina = izracunajKolicinuKorpe();   //korpa.js function that calculates korpa kolicina
    if(!korpakolicina){          //essentialy break a function if korpakolicina undefined
      return;
    }
    document.querySelector('.js-kolicina-u-kolicima').innerHTML = korpakolicina;
  }
};
renderTrackingPage();