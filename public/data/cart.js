export let cart;
loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));    
}

export function addToCart(productId){
  let matchingItem;           //boolean value
  let quantity;
  let quantitySelector;
      
      cart.forEach((cartItem)=>{              //when button clicked goe trough cart.js[], and if 
        if(productId === cartItem.productId ){    //it exists set item to matching item
          matchingItem = cartItem;
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
        matchingItem.quantity+=quantity;     // it only increases its quantity and skips cart.push
      }else{
        cart.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }
  saveToStorage();
}
export function removeFromCart(productId){
  let newCart = cart.filter((cartItem) => cartItem.productId !== productId) //returns 
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity(){    //calculates cart quantity and retuns its final value
  let cartQuantity = 0;

  cart.forEach(cartItem => {
    cartQuantity+=cartItem.quantity
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
   cart.forEach(cartItem => {
    if(productId === cartItem.productId ){
      cartItem.quantity = newQuantity;
    }
   });
   saveToStorage();
}

export function updateDeliveryOptions(productId,deliveryOptionId){
  let matchingItem;     
  cart.forEach((cartItem)=>{          
    if(productId === cartItem.productId ){ 
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
};