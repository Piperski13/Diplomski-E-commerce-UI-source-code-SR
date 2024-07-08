export let korpa;
loadFromStorage();

export function loadFromStorage(){
  korpa = JSON.parse(localStorage.getItem('korpa')) || [];
}

function saveToStorage(){
  localStorage.setItem('korpa',JSON.stringify(korpa));    
}

export function addTokorpa(productId){
  let matchingItem;           //boolean value
  let quantity;
  let quantitySelector;
      
      korpa.forEach((korpaItem)=>{              //when button clicked goe trough korpa.js[], and if 
        if(productId === korpaItem.productId ){    //it exists set item to matching item
          matchingItem = korpaItem;
        }
      });
                    //gets value of drop down quantity and stores it
      let quantityString = document.querySelector(`.js-quantity-selector-${productId}`);
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
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }
  saveToStorage();
}
export function removeFromkorpa(productId){
  let newkorpa = korpa.filter((korpaItem) => korpaItem.productId !== productId) //returns 
  korpa = newkorpa;
  saveToStorage();
}

export function calculatekorpaQuantity(){    //calculates korpa quantity and retuns its final value
  let korpaQuantity = 0;

  korpa.forEach(korpaItem => {
    korpaQuantity+=korpaItem.quantity
  });
  return korpaQuantity;
}

export function updateQuantity(productId, newQuantity){
   korpa.forEach(korpaItem => {
    if(productId === korpaItem.productId ){
      korpaItem.quantity = newQuantity;
    }
   });
   saveToStorage();
}

export function updateDeliveryOptions(productId,deliveryOptionId){
  let matchingItem;     
  korpa.forEach((korpaItem)=>{          
    if(productId === korpaItem.productId ){ 
      matchingItem = korpaItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
};