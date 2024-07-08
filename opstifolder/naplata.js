import { renderovanjeUkupnePorudzbine } from "../skripte/naplata/ukupnaPorudzbina.js";
import { renderovanjeUkupneNaplate } from "../skripte/naplata/ukupnaNaplata.js";
import { renderovanjeNaplateZaglavlje } from "../skripte/naplata/naplataZaglavlje.js";
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