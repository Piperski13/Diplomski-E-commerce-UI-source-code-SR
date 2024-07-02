import {cart, addToCart,calculateCartQuantity} from "../data/cart.js"; // imports a const cart from cart.js, created module
import {products,loadProducts} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid(){

  updateCartQuantity();

  let productsHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  if(search){
    filteredProducts = products.filter((product)=>{  

      const nameMatch = product.name.toLowerCase().includes(search);
      let keywordMatch = null;

      product.keywords.forEach((keyword)=>{
        if(keyword.includes(search)){
          keywordMatch = product;
        }
      });
      
      return nameMatch || keywordMatch;
    });
  };

  //gets products from products.js and generates html 
  filteredProducts.forEach((product)=>{
    productsHTML += `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.getRating()}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
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
      
      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-add-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-button" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`
  });

  document.querySelector('.js-product-container').innerHTML = productsHTML;

  function searchBar(){
    const searchValue = document.querySelector('.js-search-bar').value;
    const search = searchValue.toLowerCase();
    window.location.href = `amazon.html?search=${search}`;
  }

  document.querySelector('.js-search-button').addEventListener('click',()=>{
    searchBar();
  });

  document.querySelector('.js-search-bar').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
      searchBar();
    }
  })

  function updateCartQuantity(){        
    let cartQuantity = calculateCartQuantity();   //cart.js function that calculates cart quantity
    if(!cartQuantity){          //essentialy break a function if cartQuantity undefined
      return;
    }
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  function addedToCartGreen(productId,timeoutObject){     // pop up msg function
    let addMsgElement = document.querySelector(`.js-add-cart-${productId}`);    //target add cart div with opacity 0
        addMsgElement.classList.add('added-to-cart-clicked');                // and then give it a class with opacity 1
        
        if (timeoutObject.timeoutId){               //if true, it means that interval exists, clear it else -> skip it
          clearTimeout(timeoutObject.timeoutId);
        }
        timeoutObject.timeoutId = setTimeout(()=>{        //removes class and return opacity to 0 in 2000ms 
          addMsgElement.classList.remove('added-to-cart-clicked');      //it also stores interval into timeoutObject
        },2000);                                      //so if we press it again we can clear interval with if statemant
  }

  //adds event listeners to add buttons
  document.querySelectorAll('.js-add-button')
    .forEach((button)=>{      
      let addedMessageTimeouts = {};                           //create a object for checking interval addedToCartGreen
      button.addEventListener('click',()=>{
        const productId = button.dataset.productId;   //on click save data-product-id in a const
        addToCart(productId);
        addedToCartGreen(productId,addedMessageTimeouts);  // for a green pop up msg function
        updateCartQuantity();
      });
  });
};