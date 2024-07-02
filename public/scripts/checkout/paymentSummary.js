import { calculateCartQuantity, cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
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
    products.forEach(product => {
      if(product.id === productId){
        let priceCents = product.priceCents
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
  
  shippingCents = shippingCents === 0 ? 'FREE' : `$${formatCurrency(shippingCents)}`;
  generatedHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money js-test-shipping-price">${shippingCents}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money js-test-total-price">$${formatCurrency(totalAfterTax)}</div>
  </div>

  <button class="place-order-button button-primary js-place-order">
    Place your order
  </button>`;
  document.querySelector('.js-payment-summary').innerHTML= generatedHTML;
  
  document.querySelector('.js-place-order').addEventListener('click', async ()=>{
    try {
      const response = await fetch('http://127.0.0.1:3000/amazon.html',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart)
    });
    const order = await response.json();
    addOrder(order);

    } catch (error) {
      console.log('Unexpected error, try again later.');
    }

    window.location.href = 'orders.html';
  });
};