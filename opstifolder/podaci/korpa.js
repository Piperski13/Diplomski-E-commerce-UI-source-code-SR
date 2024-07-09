export let korpa;
ucitajIzSkladista();

export function ucitajIzSkladista(){
  korpa = JSON.parse(localStorage.getItem('korpa')) || [];
}

function sacuvajUSkladiste(){
  localStorage.setItem('korpa',JSON.stringify(korpa));    
}

export function dodajUKorpu(proizvodId){
  let odgovarajućiArtikal;           //boolean value
  let kolicina;
  let izborKolicine;
      
      korpa.forEach((korpaArtikal)=>{              //when button clicked goe trough korpa.js[], and if 
        if(proizvodId === korpaArtikal.proizvodId ){    //it exists set item to matching item
          odgovarajućiArtikal = korpaArtikal;
        }
      });
                    //gets value of drop down kolicina and stores it
      let kolicinaString = document.querySelector(`.js-izbor-kolicine-${proizvodId}`);
      if(kolicinaString){
        izborKolicine = kolicinaString.value
        kolicina = Number(izborKolicine);         //DOM retruns string always, so make it num
      }else{
        kolicina=1;
      }
      
    
      if(odgovarajućiArtikal){              //if odgovarajućiArtikal exsits its making this statemant true thus
        odgovarajućiArtikal.kolicina+=kolicina;     // it only increases its kolicina and skips korpa.push
      }else{
        korpa.push({
          proizvodId,
          kolicina,
          opcijeDostaveId: '1'
        });
      }
  sacuvajUSkladiste();
}
export function izbrisiIzKorpe(proizvodId){
  let novaKorpa = korpa.filter((korpaArtikal) => korpaArtikal.proizvodId !== proizvodId) //returns 
  korpa = novaKorpa;
  sacuvajUSkladiste();
}

export function izracunajKolicinuKorpe(){    //calculates korpa kolicina and retuns its final value
  let korpaKolicina = 0;

  korpa.forEach(korpaArtikal => {
    korpaKolicina+=korpaArtikal.kolicina
  });
  return korpaKolicina;
}

export function azurirajKolicinu(proizvodId, novaKolicina){
   korpa.forEach(korpaArtikal => {
    if(proizvodId === korpaArtikal.proizvodId ){
      korpaArtikal.kolicina = novaKolicina;
    }
   });
   sacuvajUSkladiste();
}

export function azurirajOpcijeDostave(proizvodId,opcijeDostaveId){
  let odgovarajućiArtikal;     
  korpa.forEach((korpaArtikal)=>{          
    if(proizvodId === korpaArtikal.proizvodId ){ 
      odgovarajućiArtikal = korpaArtikal;
    }
  });
  odgovarajućiArtikal.opcijeDostaveId = opcijeDostaveId;
  sacuvajUSkladiste();
};