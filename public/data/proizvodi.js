import {formatCurrency} from "../utils/money.js";
export class Product{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }
  getStarsUrl(){
    return `slike/ratings/rating-${this.rating.stars*10}.png`;
  }
  getRating(){
    return `${this.rating.count}`;
  }
  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
  }
  extraInfoHTML(){
    return '';
  }
}

export class Clothing extends Product {
  sizeChartLink;
  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }
  extraInfoHTML(){
    return `<a href="${this.sizeChartLink}" target=_blank >Size chart</a>`;
  }
}
export class Appliance extends Product{
  instructionsLink;
  warrantyLink;

  constructor(productDetails){
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }
  extraInfoHTML(){
    return `<a href="${this.instructionsLink}" target=_blank>Instructions link</a>
            <a href="${this.warrantyLink}" target=_blank>Warranty link</a>`;
  }
}

export let proizvodi = [];

export function loadProductsFetch(){
  const promise = fetch('http://127.0.0.1:3000/proizvodi').then((response)=>{
    return response.json();
  }).then((productDetails)=>{
    proizvodi = productDetails.map((productDetails)=>{
      if(productDetails.type === "clothing"){
        return new Clothing(productDetails);
      }
      if(productDetails.type === "appliance"){
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });

    console.log('loaded proizvodi');

  }).catch((error)=>{
    console.log('Unexpected error, please try again later.');
    console.log(error);
  });

  return promise;
};

export function loadProducts(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    proizvodi = JSON.parse(xhr.response).map((productDetails)=>{
      if(productDetails.type === "clothing"){
        return new Clothing(productDetails);
      }
      if(productDetails.type === "appliance"){
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });
    fun();
    console.log('loaded proizvodi');
  })

  xhr.addEventListener('error',(error)=>{
    console.log('Unexpected error, please try again later.');
  })

  xhr.open('GET','http://127.0.0.1:3000/proizvodi');
  xhr.send();
};