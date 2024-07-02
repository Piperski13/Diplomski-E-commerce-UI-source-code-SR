import {orders} from '../../data/orders.js';
import {formatCurrency} from '../../utils/money.js';
import {renderDateOrder} from '../../utils/date.js';
import {loadProducts,loadProductsFetch,products} from '../../data/products.js';
import {addToCart, calculateCartQuantity} from '../../data/cart.js';
console.log(orders);
loadProductsFetch().then(()=>{          //fetch, returns promise, method then
  renderOrderSummary();
});

// loadProducts(renderOrderSummary);    //call back , XMLHttpRequest

function renderOrderSummary(){
  let generatedHTML = '';
  let generatedDetailsHTML = '';

  orders.forEach(order => {

    order.products.forEach(productOrder =>{
      let matchingProduct;

      products.forEach(product => {
        if(product.id === productOrder.productId){
          matchingProduct = product;
        }
      });
     
      generatedDetailsHTML += `
          <div class="order-details-grid">
            <div class="product-image-container">
              <img src=${matchingProduct.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${renderDateOrder(productOrder.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${productOrder.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again"
              data-product-id="${matchingProduct.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
                <button class="track-package-button button-secondary">
                  Track package
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
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${renderDateOrder(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          ${returnGeneratedDetails(generatedDetailsHTML)}
        </div>
    `;
    generatedDetailsHTML = '';
  });
  document.querySelector('.js-orders-grid').innerHTML = generatedHTML;
  updateCartQuantity();

  document.querySelectorAll('.js-buy-again').forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    })
  })

  function updateCartQuantity(){        
    let cartQuantity = calculateCartQuantity();   //cart.js function that calculates cart quantity
    if(!cartQuantity){          //essentialy break a function if cartQuantity undefined
      return;
    }
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
};

console.log(orders); // number of orders
// console.log(orders[1].products); //index 1 all products array
// console.log(orders[0].products[0].productId);


