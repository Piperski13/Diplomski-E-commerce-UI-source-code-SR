import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeder.js";
import { loadProductsFetch } from "../data/proizvodi.js"

async function loadPage(){
  try {

    await Promise.all([
      loadProductsFetch()
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