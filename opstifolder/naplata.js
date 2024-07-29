import { renderovanjeUkupnePorudžbine } from "../skripte/naplata/ukupnaPorudžbina.js";
import { renderovanjeUkupneNaplate } from "../skripte/naplata/ukupnaNaplata.js";
import { renderovanjeNaplateZaglavlje } from "../skripte/naplata/naplataZaglavlje.js";
import { učitavanjeProizvoda } from "../podaci/proizvodi.js"

async function učitavanjeStranice(){
  try {

    await učitavanjeProizvoda();
    
  } catch (error) {
    console.log('GREŠKA, pokušaj kasnije.');
    console.log(error);
  }
  
  renderovanjeNaplateZaglavlje();
  renderovanjeUkupnePorudžbine();
  renderovanjeUkupneNaplate();
};
učitavanjeStranice();