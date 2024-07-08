import { renderovanjeUkupnePorudzbine } from "../scripts/checkout/ukupnaPorudzbina.js";
import { renderovanjeUkupneNaplate } from "../scripts/checkout/ukupnaNaplata.js";
import { renderovanjeNaplateZaglavlje } from "../scripts/checkout/naplataZaglavlje.js";
import { ucitavanjeProizvoda } from "../podaci/proizvodi.js"

async function ucitavanjeStranice(){
  try {

    await ucitavanjeProizvoda();
    
  } catch (error) {
    console.log('ERROR, try later');
    console.log(error);
  }
  
  renderovanjeNaplateZaglavlje();
  renderovanjeUkupnePorudzbine();
  renderovanjeUkupneNaplate();
};
ucitavanjeStranice();