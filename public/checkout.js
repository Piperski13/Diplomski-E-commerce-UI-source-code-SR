import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeder.js";
import { loadProducts, loadProductsFetch } from "../data/products.js"
import { loadCartFetch } from "../data/cart.js"

// import '../data/backend-practice.js';
// import '../data/car.js';
// import "../data/cart-oop.js"
// import "../data/cart-class.js"


async function loadPage(){
  try {

    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);
    
  } catch (error) {
    console.log('ERROR, try later');
    console.log(error);
  }
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
};
loadPage();

/*
Promise.all([
  loadProductsFetch(),      //returns a promise therefore we dont need to create one
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then((values)=>{
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

// Promise.all([
//   new Promise((resolve)=>{
//     loadProducts(()=>{
//       resolve('value test');
//     });
//   }),
//   new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     });
//   })
// ]).then((values)=>{
//   console.log(values);
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// })

// new Promise((resolve)=>{
//   loadProducts(()=>{
//     resolve();
//   });
// }).then(()=>{
//   return new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     });
//   });
// }).then(()=>{
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// loadProducts(()=>{
//   loadCart(()=>{
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });
