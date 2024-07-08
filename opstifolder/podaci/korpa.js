export let korpa;
ucitajIzSkladista();

export function ucitajIzSkladista(){
  korpa = JSON.parse(localStorage.getItem('korpa')) || [];
}

function sacuvajUSkladiste(){
  localStorage.setItem('korpa',JSON.stringify(korpa));    
}

export function dodajUKorpu(proizvodId){
  let matchingItem;           //boolean value
  let quantity;
  let quantitySelector;
      
      korpa.forEach((korpaItem)=>{              //when button clicked goe trough korpa.js[], and if 
        if(proizvodId === korpaItem.proizvodId ){    //it exists set item to matching item
          matchingItem = korpaItem;
        }
      });
                    //gets value of drop down quantity and stores it
      let quantityString = document.querySelector(`.js-quantity-selector-${proizvodId}`);
      if(quantityString){
        quantitySelector = quantityString.value
        quantity = Number(quantitySelector);         //DOM retruns string always, so make it num
      }else{
        quantity=1;
      }
      
    
      if(matchingItem){              //if matchingItem exsits its making this statemant true thus
        matchingItem.quantity+=quantity;     // it only increases its quantity and skips korpa.push
      }else{
        korpa.push({
          proizvodId,
          quantity,
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

export function calculatekorpaQuantity(){    //calculates korpa quantity and retuns its final value
  let korpaQuantity = 0;

  korpa.forEach(korpaItem => {
    korpaQuantity+=korpaItem.quantity
  });
  return korpaQuantity;
}

export function updateQuantity(proizvodId, newQuantity){
   korpa.forEach(korpaItem => {
    if(proizvodId === korpaItem.proizvodId ){
      korpaItem.quantity = newQuantity;
    }
   });
   sacuvajUSkladiste();
}

export function updateDeliveryOptions(proizvodId,deliveryOptionId){
  let matchingItem;     
  korpa.forEach((korpaItem)=>{          
    if(proizvodId === korpaItem.proizvodId ){ 
      matchingItem = korpaItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  sacuvajUSkladiste();
};