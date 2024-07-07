import { renderovanjeUkupnePorudzbine } from "../scripts/checkout/ukupnaPorudzbina.js";
import { renderovanjeUkupneNaplate } from "../scripts/checkout/ukupnaNaplata.js";
import { renderovanjeNaplateZaglavlje } from "../scripts/checkout/naplataZaglavlje.js";
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
  
  renderovanjeNaplateZaglavlje();
  renderovanjeUkupnePorudzbine();
  renderovanjeUkupneNaplate();
};
loadPage();