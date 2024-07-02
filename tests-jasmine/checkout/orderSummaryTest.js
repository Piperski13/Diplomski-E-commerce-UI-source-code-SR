import {cart, loadFromStorage} from "../../data/cart.js";
import {loadProducts,loadProductsFetch} from "../data/products.js";
import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {renderPaymentSummary} from '../../scripts/checkout/paymentSummary.js';
describe('test suite: renderOrderSummary',()=>{
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeAll(async()=>{
    await loadProductsFetch();
  });
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    document.querySelector('.test-container').innerHTML=`
    <div class="order-summary"></div>
    <div class="js-return-to-home-link"></div>
    <div class="js-payment-summary"></div>
    `
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '3'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();
    renderOrderSummary();
  });
  afterEach(()=>{
    document.querySelector('.test-container').innerHTML=``;
  })
  it('check orderSummary rendering on screen',()=>{
   expect(cart[0].productId).toEqual(productId1);
   expect(cart[0].quantity).toEqual(2);
   expect(cart[0].deliveryOptionId).toEqual('3');
   expect(document.querySelectorAll('.js-test-cart-item-container').length).toEqual(2);
   expect(document.querySelector(`.js-test-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
   expect(document.querySelector(`.js-test-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
   expect(document.querySelector(`.js-test-product-price-${productId1}`).innerText).toEqual('$10.90');

   expect(cart[1].productId).toEqual(productId2);
   expect(cart[1].quantity).toEqual(1);
   expect(cart[1].deliveryOptionId).toEqual('2');
   expect(document.querySelector(`.js-test-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');
   expect(document.querySelector(`.js-test-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
   expect(document.querySelector(`.js-test-product-price-${productId2}`).innerText).toEqual('$20.95');
  });
  it('removes a product',()=>{
    document.querySelector(`.js-delete-test-${productId1}`).click();
    document.querySelector('.confirm-window-no').click();
    expect(cart.length).toEqual(2);

    document.querySelector(`.js-delete-test-${productId1}`).click();
    document.querySelector('.confirm-window-yes').click();
    expect(cart.length).toEqual(1);

    document.querySelector(`.js-delete-test-${productId2}`).click();
    document.querySelector('.confirm-window-yes').click();
    expect(cart.length).toEqual(0);

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(0);
  });
  it('updating delivery option',()=>{
    document.querySelector(`.js-test-delivery-option-${productId1}-${3}`).click();
    expect(document.querySelector(`.js-test-delivery-option-input-${productId1}-${3}`).checked).toBe(true);

    renderPaymentSummary();
    expect(document.querySelector('.js-test-shipping-price').innerText).toEqual('$24.97');
    expect(document.querySelector('.js-test-total-price').innerText).toEqual('$74.49');
  })

});

