import { renderOrderSummary } from "../scripts/checkout/ukupnaPorudzbina.js";
import { renderPaymentSummary } from "../scripts/checkout/ukupnaNaplata.js";
import { renderCheckoutHeader } from "../scripts/checkout/naplataZaglavlje.js";
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