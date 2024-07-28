export let korpa;
ucitajIzSkladista();

export function ucitajIzSkladista(){
  korpa = JSON.parse(localStorage.getItem('korpa')) || [];
}

function sacuvajUSkladiste(){
  localStorage.setItem('korpa',JSON.stringify(korpa));    
}

export function dodajUKorpu(proizvodId){
  let odgovarajućiArtikal;           
  let kolicina;
  let izborKolicine;
      
      korpa.forEach((korpaArtikal)=>{              

        if(proizvodId === korpaArtikal.proizvodId ){    

          odgovarajućiArtikal = korpaArtikal;
        }
      });
                    
      let kolicinaString = document.querySelector(`.js-izbor-kolicine-${proizvodId}`);
      if(kolicinaString){
        izborKolicine = kolicinaString.value
        kolicina = Number(izborKolicine);         
      }else{
        kolicina=1;
      }
      
    
      if(odgovarajućiArtikal){              
        odgovarajućiArtikal.kolicina+=kolicina;     
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
  let novaKorpa = korpa.filter((korpaArtikal) => korpaArtikal.proizvodId !== proizvodId) 
  korpa = novaKorpa;
  sacuvajUSkladiste();
}

export function izracunajKolicinuKorpe(){    
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