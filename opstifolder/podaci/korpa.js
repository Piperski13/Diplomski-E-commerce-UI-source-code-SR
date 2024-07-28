export let korpa;
učitajIzSkladišta();

export function učitajIzSkladišta(){
  korpa = JSON.parse(localStorage.getItem('korpa')) || [];
}

function sačuvajUSkladište(){
  localStorage.setItem('korpa',JSON.stringify(korpa));    
}

export function dodajUKorpu(proizvodId){
  let odgovarajućiArtikal;           
  let količina;
  let izborKoličine;
      
      korpa.forEach((korpaArtikal)=>{              

        if(proizvodId === korpaArtikal.proizvodId ){    

          odgovarajućiArtikal = korpaArtikal;
        }
      });
                    
      let količinaString = document.querySelector(`.js-izbor-količine-${proizvodId}`);
      if(količinaString){
        izborKoličine = količinaString.value
        količina = Number(izborKoličine);         
      }else{
        količina=1;
      }
      
    
      if(odgovarajućiArtikal){              
        odgovarajućiArtikal.količina+=količina;     
      }else{
        korpa.push({
          proizvodId,
          količina,
          opcijeDostaveId: '1'
        });
      }
  sačuvajUSkladište();
}
export function izbrišiIZKorpe(proizvodId){
  let novaKorpa = korpa.filter((korpaArtikal) => korpaArtikal.proizvodId !== proizvodId) 
  korpa = novaKorpa;
  sačuvajUSkladište();
}

export function izračunajKoličinuKorpe(){    
  let korpaKoličina = 0;

  korpa.forEach(korpaArtikal => {
    korpaKoličina+=korpaArtikal.količina
  });
  return korpaKoličina;
}

export function ažurirajKoličinu(proizvodId, novaKoličina){
   korpa.forEach(korpaArtikal => {
    if(proizvodId === korpaArtikal.proizvodId ){
      korpaArtikal.količina = novaKoličina;
    }
   });
   sačuvajUSkladište();
}

export function ažurirajOpcijeDostave(proizvodId,opcijeDostaveId){
  let odgovarajućiArtikal;     
  korpa.forEach((korpaArtikal)=>{          
    if(proizvodId === korpaArtikal.proizvodId ){ 
      odgovarajućiArtikal = korpaArtikal;
    }
  });
  odgovarajućiArtikal.opcijeDostaveId = opcijeDostaveId;
  sačuvajUSkladište();
};