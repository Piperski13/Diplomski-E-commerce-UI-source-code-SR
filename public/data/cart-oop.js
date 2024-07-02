function Cart(loadStorageKey){
  const cart = {
    cartItems: undefined,
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(loadStorageKey)) || [];
    },
    saveToStorage(){
      localStorage.setItem(loadStorageKey,JSON.stringify(this.cartItems));    
    },
    addToCart(productId){
      let matchingItem;           //boolean value
      this.cartItems.forEach((cartItem)=>{              //when button clicked goe trough cart.js[], and if 
        if(productId === cartItem.productId ){    //it exists set item to matching item
          matchingItem = cartItem;
        }
      });
                    //gets value of drop down quantity and stores it
      // let quantityString = document.querySelector(`.js-quantity-selector-${productId}`).value
      // let quantity = Number(quantityString);         //DOM retruns string always, so make it num
    
      if(matchingItem){              //if matchingItem exsits its making this statemant true thus
        matchingItem.quantity+=1;     // it only increases its quantity and skips cart.push
      }else{
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    },
    removeFromCart(productId){
      let newCart = this.cartItems.filter((cartItem) => cartItem.productId !== productId) //returns 
      this.cartItems = newCart;
      this.saveToStorage();
    },
    calculateCartQuantity(){    //calculates cart quantity and retuns its final value
      let cartQuantity = 0;
    
      this.cartItems.forEach(cartItem => {
        cartQuantity+=cartItem.quantity
      });
      return cartQuantity;
    },
    updateQuantity(productId, newQuantity){
      this.cartItems.forEach(cartItem => {
       if(productId === cartItem.productId ){
         cartItem.quantity = newQuantity;
       }
      });
      this.saveToStorage();
   },
   updateDeliveryOptions(productId,deliveryOptionId){
     let matchingItem;     
     this.cartItems.forEach((cartItem)=>{          
       if(productId === cartItem.productId ){ 
         matchingItem = cartItem;
       }
     });
     matchingItem.deliveryOptionId = deliveryOptionId;
     this.saveToStorage();
   }
  };
  return cart;
}



const cart = Cart('cart-oop');
const bussinesCart = Cart('bussinesCart-oop');

cart.loadFromStorage();
bussinesCart.loadFromStorage();

console.log(cart);
console.log(bussinesCart);