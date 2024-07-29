import { renderovanjeUkupnePorudzbine } from "../skripte/naplata/ukupnaPorudzbina.js";
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
  renderovanjeUkupnePorudzbine();
  renderovanjeUkupneNaplate();
};
učitavanjeStranice();