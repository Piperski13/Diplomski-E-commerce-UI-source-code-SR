import {korpa,
  izbrisiIzKorpe,
  izracunajKolicinuKorpe,
  azurirajKolicinu,
  azurirajOpcijeDostave}
   from "../../podaci/korpa.js";
import {proizvodi} from "../../podaci/proizvodi.js"
import {formatiranjeValute} from "../../alatke/rsdFormat.js";
import {opcijeDostave,izracunajDatumDostave} from "../../podaci/opcijePosiljke.js"
import { renderovanjeUkupneNaplate } from "./ukupnaNaplata.js";

export function renderovanjeUkupnePorudzbine(){
  function keyboardEvent(proizvodId){
    document.querySelectorAll('.kolicina-imput').forEach((input)=>{
      input.addEventListener('keydown',(event)=>{
        if(event.key==='Enter'){
          const itemContainer = document.querySelector(`.js-korpa-item-container-${proizvodId}`);
          itemContainer.classList.remove('is-editing-kolicina');
          updateInput(proizvodId);
        }
      });
    });
  };
  let checkoutHTML = '';
  korpa.forEach(korpaArtikal => {
    const proizvodId = korpaArtikal.proizvodId;
    let matchingProduct;

    proizvodi.forEach(product => {
      if(product.id === proizvodId){
        matchingProduct = product;
      }
    });

    const opcijeDostaveId = korpaArtikal.opcijeDostaveId;
    let matchingDelivery;
    opcijeDostave.forEach(option => {
      if(option.id === opcijeDostaveId){
        matchingDelivery = option;
      }
    });
    const formatedDate = izracunajDatumDostave(matchingDelivery.dostaveDani);
    checkoutHTML += 
    `<div class="js-korpa-item-container-${matchingProduct.id} 
      js-test-korpa-item-container">

        <div class="dostava-date">
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
            ${matchingProduct.uzmiCenu()}
          </div>
          <div class="product-kolicina">
            <span class="js-test-product-kolicina-${matchingProduct.id}">
              Količina: <span class="kolicina-label">
              ${korpaArtikal.kolicina}
              </span>
            </span>
            <span class="update-kolicina-link link-primary js-update-link" 
            data-proizvod-id="${matchingProduct.id}">
              Ažuriraj
            </span>
            <input type="text" class="kolicina-imput js-kolicina-imput-${matchingProduct.id}">
            <span class="save-kolicina-link link-primary js-save-link"
            data-proizvod-id="${matchingProduct.id}">Save</span>

            <span class="delete-kolicina-link link-primary js-delete-link 
            js-delete-test-${matchingProduct.id}" 
            data-proizvod-id="${matchingProduct.id}">
              Obriši
            </span>
          </div>
        </div>

        <div class="dostava-options">
          <div class="dostava-options-title">
            Izaberite opciju isporuke:
          </div>
          ${opcijeDostaveHTML(matchingProduct,korpaArtikal)}
        </div>
      </div>
    </div>`;
  });
  //generates dostava html
  function opcijeDostaveHTML(matchingProduct,korpaArtikal){
    let generisaniHTML='';
    opcijeDostave.forEach((option) =>{
      const formatedDate = izracunajDatumDostave(option.dostaveDani);
      const priceStrings = option.ceneDinari === 0 ? 'Besplatna dostava' : `${formatiranjeValute(option.ceneDinari)} <span class="rsd-stil">RSD</span> - Dostava`;
      const isChecked = option.id === korpaArtikal.opcijeDostaveId;
      generisaniHTML +=
      `<div class="dostava-option js-dostava-option
      js-test-dostava-option-${matchingProduct.id}-${option.id}"
      data-proizvod-id="${matchingProduct.id}"
      data-dostava-id="${option.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="dostava-option-input 
          js-test-dostava-option-input-${matchingProduct.id}-${option.id}"
          name="dostava-option-${matchingProduct.id}">
        <div>
          <div class="dostava-option-date">
            ${formatedDate}
          </div>
          <div class="dostava-option-price">
            ${priceStrings}
          </div>
        </div>
      </div>`;
    })
    return generisaniHTML;
  }
  function updatekorpakolicina(){ 
    let korpakolicina = izracunajKolicinuKorpe();     //korpa.js function that calculates korpa kolicina
    if(korpakolicina === 0){
      document.querySelector('.js-povratak-na-market-link').innerHTML = ``;
    }
    else if(korpakolicina === 1){
      document.querySelector('.js-povratak-na-market-link').innerHTML = `${korpakolicina} artikal`;
    }
    else{
      document.querySelector('.js-povratak-na-market-link').innerHTML = `${korpakolicina} artikla`;
    }
  };

  function productkolicinaUpdate(){
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
        itemContainer.classList.add('is-editing-kolicina');
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
        itemContainer.classList.remove('is-editing-kolicina');
        updateInput(proizvodId);
      });
    });
  }
  
  function deleteContainer(proizvodId){
    izbrisiIzKorpe(proizvodId);
    const container = document.querySelector(`.js-korpa-item-container-${proizvodId}`);
    container.remove();
    updatekorpakolicina();
    renderovanjeUkupneNaplate();
  }
  function updateInput(proizvodId){
    const kolicinaImput = document.querySelector(`.js-kolicina-imput-${proizvodId}`)
    let novaKolicina = Number(kolicinaImput.value);
    if(novaKolicina === 0){
      deleteContainer(proizvodId);
      azurirajKolicinu(proizvodId,novaKolicina);
      renderovanjeUkupnePorudzbine();
      renderovanjeUkupneNaplate();
    }
    if(novaKolicina>=1000 || novaKolicina<0){
      alert('Error value');
      renderovanjeUkupnePorudzbine();
    }
    else{
      azurirajKolicinu(proizvodId,novaKolicina);
      renderovanjeUkupnePorudzbine();
      renderovanjeUkupneNaplate();
    }
  }
  function deliveryUpdate(){
    document.querySelectorAll('.js-dostava-option').forEach(option=>{
      option.addEventListener('click',()=>{
        const proizvodId = option.dataset.proizvodId;
        const opcijeDostaveId = option.dataset.dostavaId;
        azurirajOpcijeDostave(proizvodId,opcijeDostaveId);
        renderovanjeUkupnePorudzbine();
        renderovanjeUkupneNaplate(); // generates Payment box again
      })
    })
  }

  document.querySelector('.pregled-porudzbine').innerHTML = checkoutHTML;

  updatekorpakolicina(); // updates korpa kolicina in header part of the checkout.html
  productkolicinaUpdate();  // adds event listeners to update/delete kolicina
  saveLinkEvent();        // adds event listeners to save button that gets created on click update
  deliveryUpdate(); // adds interactive radio buttens / dates
}