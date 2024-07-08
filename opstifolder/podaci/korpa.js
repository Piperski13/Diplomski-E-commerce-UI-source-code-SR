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
  let kolicinaSelector;
      
      korpa.forEach((korpaItem)=>{              //when button clicked goe trough korpa.js[], and if 
        if(proizvodId === korpaItem.proizvodId ){    //it exists set item to matching item
          odgovarajućiArtikal = korpaItem;
        }
      });
                    //gets value of drop down kolicina and stores it
      let kolicinaString = document.querySelector(`.js-kolicina-selector-${proizvodId}`);
      if(kolicinaString){
        kolicinaSelector = kolicinaString.value
        kolicina = Number(kolicinaSelector);         //DOM retruns string always, so make it num
      }else{
        kolicina=1;
      }
      
    
      if(odgovarajućiArtikal){              //if odgovarajućiArtikal exsits its making this statemant true thus
        odgovarajućiArtikal.kolicina+=kolicina;     // it only increases its kolicina and skips korpa.push
      }else{
        korpa.push({
          proizvodId,
          kolicina,
          deliveryOptionId: '1'
        });
      }
  sacuvajUSkladiste();
}
export function removeFromkorpa(proizvodId){
  let newkorpa = korpa.filter((korpaItem) => korpaItem.proizvodId !== proizvodId) //returns 
  korpa = newkorpa;
  sacuvajUSkladiste();
}

export function calculatekorpakolicina(){    //calculates korpa kolicina and retuns its final value
  let korpakolicina = 0;

  korpa.forEach(korpaItem => {
    korpakolicina+=korpaItem.kolicina
  });
  return korpakolicina;
}

export function updatekolicina(proizvodId, newkolicina){
   korpa.forEach(korpaItem => {
    if(proizvodId === korpaItem.proizvodId ){
      korpaItem.kolicina = newkolicina;
    }
   });
   sacuvajUSkladiste();
}

export function updateDeliveryOptions(proizvodId,deliveryOptionId){
  let odgovarajućiArtikal;     
  korpa.forEach((korpaItem)=>{          
    if(proizvodId === korpaItem.proizvodId ){ 
      odgovarajućiArtikal = korpaItem;
    }
  });
  odgovarajućiArtikal.deliveryOptionId = deliveryOptionId;
  sacuvajUSkladiste();
};