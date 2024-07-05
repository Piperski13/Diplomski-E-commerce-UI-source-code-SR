import {proizvodi,loadProductsFetch} from '../../data/proizvodi.js';
import {orders} from '../../data/orders.js';
import {renderDateOrderTracking,progressBar} from '../../utils/date.js';
import {calculateCartQuantity} from "../../data/cart.js"

const url = new URL(window.location.href);
console.log(url.searchParams.get('orderId'));
console.log(url.searchParams.get('productId'));

// loadProductsFetch().then(()=>{
//   renderTrackingPage();
// })

async function renderTrackingPage(){
  await loadProductsFetch();

  let matchingProduct;
  let matchingOrder;
  let matchingOrderDate;

  const madeOrderId = url.searchParams.get('orderId');
  const productOrderId = url.searchParams.get('productId');

  orders.forEach(order => {
    if(order.id === madeOrderId){

      matchingOrder = order;
      matchingOrderDate = order;

      matchingOrder.proizvodi.forEach(productOrder => {
        if(productOrder.productId === productOrderId){
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

  let generatedHTML = `
     <div class="order-tracking">
        <a class="back-to-porudzbine-link link-primary" href="orders.html">
          Pogledajte sve porudžbine
        </a>

        <div class="delivery-date">
          Dolazak u: ${renderDateOrderTracking(matchingOrder.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${matchingProduct.naziv}
        </div>

        <div class="product-info">
          Količina: ${matchingOrder.quantity}
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
  document.querySelector('.main').innerHTML = generatedHTML;
  updateCartQuantity();

  function updateCartQuantity(){        
    let cartQuantity = calculateCartQuantity();   //cart.js function that calculates cart quantity
    if(!cartQuantity){          //essentialy break a function if cartQuantity undefined
      return;
    }
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
};
renderTrackingPage();