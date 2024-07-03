import {Product,Clothing,Appliance} from "../../data/proizvodi.js";
describe('test Product class',()=>{
  let product;
  beforeEach(()=>{
      product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "slike/proizvodi/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });
  });
  afterEach(()=>{
    document.querySelector('.test-container').innerHTML=``;
  });
  it('product class test:',()=>{
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.priceCents).toEqual(1090);
    expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
  });
  it('product extraInfoHTML method',()=>{
    expect(document.querySelector('.test-container').innerHTML=`${product.extraInfoHTML()}`).toEqual('');
  });
  it('product stars rating method',()=>{
    expect(document.querySelector('.test-container').innerHTML=`${product.getStarsUrl()}`).toEqual(`slike/ratings/rating-45.png`);
  });
  it('product rating count method',()=>{
    expect(document.querySelector('.test-container').innerHTML=`${product.getRating()}`).toEqual('87');
  });
  it('product priceCents method',()=>{
    expect(document.querySelector('.test-container').innerHTML=`${product.getPrice()}`).toEqual('$10.90');
  })
});
describe('test Clothing class:',()=>{
  let clothing;
  beforeEach(()=>{
      clothing = new Clothing({
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "slike/proizvodi/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        priceCents: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens"
        ],
        type: "clothing",
        sizeChartLink: "slike/clothing-size-chart.png"
      });
  });
  afterEach(()=>{
    document.querySelector('.test-container').innerHTML=``;
  });
  it('clothing class test:',()=>{
    expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
  });
  it('clothing sizeChartLink property',()=>{
    expect(clothing.sizeChartLink).toEqual("slike/clothing-size-chart.png");
  });
  it('clothing extraInfoHTML method',()=>{
    expect(document.querySelector('.test-container').innerHTML=`${clothing.extraInfoHTML()}`).toContain('Size chart');
  });
});
describe('test Appliance class:',()=>{
  let appliance;
  beforeEach(()=>{
    appliance = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "slike/proizvodi/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      instructionsLink: "slike/appliance-instructions.png",
      warrantyLink: "slike/appliance-warranty.png"
    });
  });
  afterEach(()=>{
    document.querySelector('.test-container').innerHTML=``;
  });
  it('appliance class test:',()=>{
    expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(appliance.name).toEqual("2 Slot Toaster - Black");
  });
  it('appliance slike links',()=>{
    expect(appliance.instructionsLink).toEqual("slike/appliance-instructions.png");
    expect(appliance.warrantyLink).toEqual("slike/appliance-warranty.png");
  });
  it('appliance extraInfoHTML method',()=>{
    expect(appliance.extraInfoHTML()).toContain(
      `<a href="slike/appliance-instructions.png" target=_blank>Instructions link</a>
            <a href="slike/appliance-warranty.png" target=_blank>Warranty link</a>`
    );
  });
});