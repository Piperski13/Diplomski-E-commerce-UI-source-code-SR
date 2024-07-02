class Cart{
  cartItems;
  #loadStorageKey;

  constructor(loadStorageKey){
    this.#loadStorageKey = loadStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#loadStorageKey)) || [];
  }
  saveToStorage(){
    localStorage.setItem(this.#loadStorageKey,JSON.stringify(this.cartItems));    
  }
  addToCart(productId){
    let matchingItem;           
    this.cartItems.forEach((cartItem)=>{              
      if(productId === cartItem.productId ){    
        matchingItem = cartItem;
      }
    }); 
    if(matchingItem){              
      matchingItem.quantity+=1;     
    }else{
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }
  removeFromCart(productId){
    let newCart = this.cartItems.filter((cartItem) => cartItem.productId !== productId)  
    this.cartItems = newCart;
    this.saveToStorage();
  }
  calculateCartQuantity(){    
    let cartQuantity = 0;
  
    this.cartItems.forEach(cartItem => {
      cartQuantity+=cartItem.quantity
    });
    return cartQuantity;
  }
  updateQuantity(productId, newQuantity){
    this.cartItems.forEach(cartItem => {
     if(productId === cartItem.productId ){
       cartItem.quantity = newQuantity;
     }
    });
    this.saveToStorage();
 }
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
}

const cart = new Cart('cart-oop');
const bussinesCart = new Cart('bussinesCart-oop');



console.log(cart);
console.log(bussinesCart);
console.log(bussinesCart instanceof Cart);