export let cart;
loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// export let cart = JSON.parse(localStorage.getItem('cart'));

// if (!cart) {
//   cart = [{
//     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//     quantity: 2,
//     deliveryOptionId: '3'
//   }, {
//     productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//     quantity: 1,
//     deliveryOptionId: '2'
//   }];
// }


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

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const cart =  await response.text();
  console.log(cart);
};