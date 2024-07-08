import {korpa,
  removeFromkorpa,
  calculatekorpaQuantity,
  updateQuantity,
  updateDeliveryOptions}
   from "../../podaci/korpa.js";
import {proizvodi} from "../../podaci/proizvodi.js"
import {formatCurrency} from "../../alatke/rsdFormat.js";
import {deliveryOptions,calculateDeliveryDate} from "../../podaci/opcijePosiljke.js"
import { renderovanjeUkupneNaplate } from "./ukupnaNaplata.js";

export function renderovanjeUkupnePorudzbine(){
  function keyboardEvent(proizvodId){
    document.querySelectorAll('.quantity-imput').forEach((input)=>{
      input.addEventListener('keydown',(event)=>{
        if(event.key==='Enter'){
          const itemContainer = document.querySelector(`.js-korpa-item-container-${proizvodId}`);
          itemContainer.classList.remove('is-editing-quantity');
          updateInput(proizvodId);
        }
      });
    });
  };
  let checkoutHTML = '';
  korpa.forEach(korpaItem => {
    const proizvodId = korpaItem.proizvodId;
    let matchingProduct;

    proizvodi.forEach(product => {
      if(product.id === proizvodId){
        matchingProduct = product;
      }
    });

    const deliveryOptionId = korpaItem.deliveryOptionId;
    let matchingDelivery;
    deliveryOptions.forEach(option => {
      if(option.id === deliveryOptionId){
        matchingDelivery = option;
      }
    });
    const formatedDate = calculateDeliveryDate(matchingDelivery.deliveryDays);
    checkoutHTML += 
    `<div class="js-korpa-item-container-${matchingProduct.id} 
      js-test-korpa-item-container">

        <div class="delivery-date">
          Datum isporuke: ${formatedDate}
        </div>

      <div class="korpa-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.slika}">

        <div class="korpa-item-details">
          <div class="product-name js-test-product-name-${matchingProduct.id}">
            ${matchingProduct.naziv}
          </div>
          <div class="product-price js-test-product-price-${matchingProduct.id}">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span class="js-test-product-quantity-${matchingProduct.id}">
              Količina: <span class="quantity-label">
              ${korpaItem.quantity}
              </span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" 
            data-proizvod-id="${matchingProduct.id}">
              Ažuriraj
            </span>
            <input type="text" class="quantity-imput js-quantity-imput-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link"
            data-proizvod-id="${matchingProduct.id}">Save</span>

            <span class="delete-quantity-link link-primary js-delete-link 
            js-delete-test-${matchingProduct.id}" 
            data-proizvod-id="${matchingProduct.id}">
              Obriši
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Izaberite opciju isporuke:
          </div>
          ${deliveryOptionsHTML(matchingProduct,korpaItem)}
        </div>
      </div>
    </div>`;
  });
  //generates delivery html
  function deliveryOptionsHTML(matchingProduct,korpaItem){
    let generatedHTML='';
    deliveryOptions.forEach((option) =>{
      const formatedDate = calculateDeliveryDate(option.deliveryDays);
      const priceStrings = option.priceCents === 0 ? 'Besplatna dostava' : `${formatCurrency(option.priceCents)} <span class="rsd-stil">RSD</span> - Dostava`;
      const isChecked = option.id === korpaItem.deliveryOptionId;
      generatedHTML +=
      `<div class="delivery-option js-delivery-option
      js-test-delivery-option-${matchingProduct.id}-${option.id}"
      data-proizvod-id="${matchingProduct.id}"
      data-delivery-id="${option.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input 
          js-test-delivery-option-input-${matchingProduct.id}-${option.id}"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${formatedDate}
          </div>
          <div class="delivery-option-price">
            ${priceStrings}
          </div>
        </div>
      </div>`;
    })
    return generatedHTML;
  }
  function updatekorpaQuantity(){ 
    let korpaQuantity = calculatekorpaQuantity();     //korpa.js function that calculates korpa quantity
    if(korpaQuantity === 0){
      document.querySelector('.js-return-to-home-link').innerHTML = ``;
    }
    else if(korpaQuantity === 1){
      document.querySelector('.js-return-to-home-link').innerHTML = `${korpaQuantity} artikal`;
    }
    else{
      document.querySelector('.js-return-to-home-link').innerHTML = `${korpaQuantity} artikla`;
    }
  };

  function productQuantityUpdate(){
    const confirmYes = document.querySelector('.potvrdi-prozor-da');
    const confirmNo = document.querySelector('.potvrdi-prozor-ne');

    //event Listener for a delete button
    document.querySelectorAll('.js-delete-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const proizvodId = link.dataset.proizvodId;
        const confirmWindow = document.getElementById('potvrdi-brisanje');
        confirmWindow.classList.toggle('potvrdi-skriveno');

        function handleConfirmYes(){
          
          confirmWindow.classList.toggle('potvrdi-skriveno');
          confirmYes.removeEventListener('click',handleConfirmYes);
          confirmNo.removeEventListener('click',handleConfirmNo);
          deleteContainer(proizvodId);
        }
        function handleConfirmNo(){
          confirmWindow.classList.toggle('potvrdi-skriveno');
          confirmYes.removeEventListener('click',handleConfirmYes);
          confirmNo.removeEventListener('click',handleConfirmNo);
        }

        confirmYes.addEventListener('click',handleConfirmYes);
        confirmNo.addEventListener('click',handleConfirmNo);
      });
    });
  
    //event Listener for a update button
    document.querySelectorAll('.js-update-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const proizvodId = link.dataset.proizvodId;
        const itemContainer = document.querySelector(`.js-korpa-item-container-${proizvodId}`);
        itemContainer.classList.add('is-editing-quantity');
        keyboardEvent(proizvodId);
      });
    });
  }

    //adds event listeners to all Save links and on click removes class that was previously set for container, gets value from input and turns it into a num, and the pass is it in korpa.js
    // and finnaly updates the page ( *renderovanjeUkupnePorudzbine() )
  function saveLinkEvent(){
    document.querySelectorAll('.js-save-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const proizvodId = link.dataset.proizvodId;
        const itemContainer = document.querySelector(`.js-korpa-item-container-${proizvodId}`);
        itemContainer.classList.remove('is-editing-quantity');
        updateInput(proizvodId);
      });
    });
  }
  
  function deleteContainer(proizvodId){
    removeFromkorpa(proizvodId);
    const container = document.querySelector(`.js-korpa-item-container-${proizvodId}`);
    container.remove();
    updatekorpaQuantity();
    renderovanjeUkupneNaplate();
  }
  function updateInput(proizvodId){
    const quantityImput = document.querySelector(`.js-quantity-imput-${proizvodId}`)
    let newQuantity = Number(quantityImput.value);
    if(newQuantity === 0){
      deleteContainer(proizvodId);
      updateQuantity(proizvodId,newQuantity);
      renderovanjeUkupnePorudzbine();
      renderovanjeUkupneNaplate();
    }
    if(newQuantity>=1000 || newQuantity<0){
      alert('Error value');
      renderovanjeUkupnePorudzbine();
    }
    else{
      updateQuantity(proizvodId,newQuantity);
      renderovanjeUkupnePorudzbine();
      renderovanjeUkupneNaplate();
    }
  }
  function deliveryUpdate(){
    document.querySelectorAll('.js-delivery-option').forEach(option=>{
      option.addEventListener('click',()=>{
        const proizvodId = option.dataset.proizvodId;
        const deliveryOptionId = option.dataset.deliveryId;
        updateDeliveryOptions(proizvodId,deliveryOptionId);
        renderovanjeUkupnePorudzbine();
        renderovanjeUkupneNaplate(); // generates Payment box again
      })
    })
  }

  document.querySelector('.pregled-porudzbine').innerHTML = checkoutHTML;

  updatekorpaQuantity(); // updates korpa quantity in header part of the checkout.html
  productQuantityUpdate();  // adds event listeners to update/delete quantity
  saveLinkEvent();        // adds event listeners to save button that gets created on click update
  deliveryUpdate(); // adds interactive radio buttens / dates
}