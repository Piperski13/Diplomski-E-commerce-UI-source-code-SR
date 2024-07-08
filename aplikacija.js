const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // id generator package
const deliveryOptions = require('./serverskaStrana/opcijePosiljke.js');

const app = express();


app.use(express.json()); //middleware
app.use(cors()); //middleware

app.use(express.static(path.join(__dirname,'opstiFolder')));


const proizvodi = JSON.parse(fs.readFileSync('./serverskaStrana/proizvodi.json','utf-8'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'opstiFolder', 'market.html'));
});

app.get('/naplata', (req, res) => {
  res.sendFile(path.join(__dirname, 'opstiFolder', 'naplata.html'));
});

app.get('/porudzbine', (req, res) => {
  res.sendFile(path.join(__dirname, 'opstiFolder', 'porudzbine.html'));
});

app.get('/proizvodi',(req,res)=>{
  res.status(200).json(proizvodi)
});

app.post('/market.html',(req,res)=>{  
  const currentTime = dayjs().toISOString();
  const { korpa, totalAfterTax } = req.body;
  let priceCentsTotal=0;
  let odgovarajućiArtikal;
  let newkorpa=[];

  korpa.forEach(item => {
    
    proizvodi.forEach(product =>{
      if(product.id === item.proizvodId){
        odgovarajućiArtikal = product;
        newkorpa.push(odgovarajućiArtikal);
      }
    })
  });
  
  let order = korpa.map(korpaArtikal =>{
    const itemNumberOption = parseInt(korpaArtikal.deliveryOptionId);
    const finalOption = deliveryOptions[itemNumberOption-1];
    const estimatedDeliveryTime = dayjs().add(finalOption.deliveryDays,'days').toISOString();
    return {
      proizvodId: korpaArtikal.proizvodId,
      kolicina: korpaArtikal.kolicina,
      estimatedDeliveryTime: estimatedDeliveryTime,
      variation: null
    }
  });

  res.status(201).json({
    id: uuidv4(),
    orderTime: currentTime,
    totalCostCents: totalAfterTax,
    proizvodi: order
  })         
});

const port = 3000;
app.listen(port,()=>{
  console.log(`Port ${port} is waiting for a request...`);
})