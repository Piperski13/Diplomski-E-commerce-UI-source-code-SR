import {orders,removeFromOrders} from '../../podaci/porudzbine.js';
import {formatCurrency} from '../../alatke/rsdFormat.js';
import {renderDateOrder} from '../../alatke/datum.js';
import {loadProducts,ucitavanjeProizvoda,proizvodi} from '../../podaci/proizvodi.js';
import {dodajUKorpu, calculatekorpakolicina} from '../../podaci/korpa.js';
console.log(orders);
ucitavanjeProizvoda().then(()=>{          //fetch, returns promise, method then
  renderovanjeUkupnePorudzbine();
});

// loadProducts(renderovanjeUkupnePorudzbine);    //call back , XMLHttpRequest

function renderovanjeUkupnePorudzbine(){
  let generatedHTML = '';
  let generatedDetailsHTML = '';

  orders.forEach(order => {

    order.proizvodi.forEach(productOrder =>{
      let matchingProduct;

      proizvodi.forEach(product => {
        if(product.id === productOrder.proizvodId){
          matchingProduct = product;
        }
      });
     
      generatedDetailsHTML += `
          <div class="order-details-grid">
            <div class="product-image-container">
              <img src=${matchingProduct.slika}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.naziv}
              </div>
              <div class="product-delivery-date">
                Dolazak: ${renderDateOrder(productOrder.estimatedDeliveryTime)}
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
              <a href="pracenje.html?orderId=${order.id}&proizvodId=${matchingProduct.id}">
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
        <div class="order-container js-orders-item-container-${order.id}">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Naručeno datuma:</div>
                <div>${renderDateOrder(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Ukupno:</div>
                <div>${formatCurrency(order.totalCostCents)} <span class="rsd-stil">RSD</span></div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">ID Porudžbine:</div>
              <div>${order.id}</div>
            </div>
            <button class="remove-order js-remove-order" data-proizvod-id="${order.id}">X</button>
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

  document.querySelectorAll('.js-remove-order').forEach((button)=>{
    button.addEventListener('click',()=>{
      const orderId = button.dataset.proizvodId;
      removeFromOrders(orderId);
      const container = document.querySelector(`.js-orders-item-container-${orderId}`);
      container.remove();
      renderovanjeUkupnePorudzbine();
    })
  })

  function updatekorpakolicina(){        
    let korpakolicina = calculatekorpakolicina();   //korpa.js function that calculates korpa kolicina
    if(!korpakolicina){          //essentialy break a function if korpakolicina undefined
      return;
    }
    document.querySelector('.js-kolicina-u-kolicima').innerHTML = korpakolicina;
  }
};

console.log(orders); // number of orders
// console.log(orders[1].proizvodi); //index 1 all proizvodi array
// console.log(orders[0].proizvodi[0].proizvodId);


