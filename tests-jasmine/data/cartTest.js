import { addToCart,cart,loadFromStorage } from "../../data/cart.js";
//works assuming that quantity has a value
describe('test suite: addToCart',()=>{
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
  })
  afterEach(()=>{
    document.querySelector('.test-container').innerHTML = ``;
  })
  
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    document.querySelector('.test-container').innerHTML =`
    <div class="product-quantity-container">
      <select class="js-quantity-selector-${productId1}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    `

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
});