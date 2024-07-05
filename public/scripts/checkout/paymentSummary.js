import { calculateCartQuantity, cart } from "../../data/cart.js";
import { proizvodi } from "../../data/proizvodi.js";
import { formatCurrency } from "../../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js"
import { addOrder } from "../../data/orders.js"

export function renderPaymentSummary(){
  let generatedHTML = '';
  let cartQuantity = calculateCartQuantity();
  let totalCents = 0;
  let shippingCents = 0;
  cart.forEach(cartItem => {
    const productId = cartItem.productId;
    const productQuantity = cartItem.quantity;
    const deliveryOptionId = cartItem.deliveryOptionId;
    proizvodi.forEach(product => {
      if(product.id === productId){
        let priceCents = product.cenaCentima
        totalCents += productQuantity * priceCents;

      }
    });
    deliveryOptions.forEach(option => {
      if(option.id === deliveryOptionId){
        shippingCents+=option.priceCents *productQuantity;
      }
    });
  });
  const totalBeforeTax = shippingCents+totalCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalAfterTax =  totalBeforeTax + taxCents
  
  shippingCents = shippingCents === 0 ? 'Besplatna dostava' : `${formatCurrency(shippingCents)}  <span class="rsd-stil">RSD</span>`;
  generatedHTML = `
  <div class="payment-summary-title">
    Porudžbina:
  </div>

  <div class="payment-summary-row">
    <div>Broj artikala (${cartQuantity}):</div>
    <div class="payment-summary-money">${formatCurrency(totalCents)} <span class="rsd-stil">RSD</span></div>
  </div>

  <div class="payment-summary-row">
    <div>Dostava:</div>
    <div class="payment-summary-money js-test-shipping-price">${shippingCents}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Cena pre PDV-a:</div>
    <div class="payment-summary-money">${formatCurrency(totalBeforeTax)} <span class="rsd-stil">RSD</span></div>
  </div>

  <div class="payment-summary-row">
    <div>Cena PDV (10%):</div>
    <div class="payment-summary-money">${formatCurrency(taxCents)} <span class="rsd-stil">RSD</span></div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Ukupna cena:</div>
    <div class="payment-summary-money js-test-total-price">${formatCurrency(totalAfterTax)} <span class="rsd-stil">RSD</span></div>
  </div>

  <button class="place-order-button button-primary js-place-order">
    Poruči
  </button>`;
  document.querySelector('.js-payment-summary').innerHTML= generatedHTML;
  
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      const payload = {
        cart: cart,
        totalAfterTax: totalAfterTax
      };
  
      const response = await fetch('http://127.0.0.1:3000/market.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const order = await response.json();
      addOrder(order);
  
    } catch (error) {
      console.log('Unexpected error, try again later.');
    }
  
    window.location.href = 'orders.html';
  });  
};