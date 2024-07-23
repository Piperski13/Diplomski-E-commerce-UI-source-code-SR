const fs = require('fs');
const express = require('express');
const dayjs = require('dayjs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // id generator paket
const opcijeDostave = require('./serverskaStrana/opcijePosiljke.js');

const app = express();

app.use(express.json()); //middleware

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
  const trenutnoVreme = dayjs().toISOString();
  const { korpa, ukupnoPoslePDV } = req.body;

  let porudzbina = korpa.map(korpaArtikal =>{
    const artikalBrojOpcijeDostave = parseInt(korpaArtikal.opcijeDostaveId);
    const finalnaOpcija = opcijeDostave[artikalBrojOpcijeDostave-1];
    const procenjenoVremeIsporuke = izracunajDatumDostave(finalnaOpcija.dostaveDani);
    return {
      proizvodId: korpaArtikal.proizvodId,
      kolicina: korpaArtikal.kolicina,
      procenjenoVremeIsporuke: procenjenoVremeIsporuke,
      variation: null
    }
  });

  res.status(201).json({
    id: uuidv4(),
    vremePorudzbine: trenutnoVreme,
    ukupnaCenaDinari: ukupnoPoslePDV,
    proizvodi: porudzbina
  })         
});


function daLiJeVikend(datum) {
  const danUNedelju = datum.format('dddd');
  return danUNedelju === 'Saturday' || danUNedelju === 'Sunday';
}
//ako je vikend preskoci i vrati vrednost dostave 
function izracunajDatumDostave(opcijaDostave){
  let preostaliDani = opcijaDostave; //ovo je jednako 7 ili 3 ili 1
  let datumIsporuke = dayjs();
  while (preostaliDani > 0) {
    datumIsporuke = datumIsporuke.add(1, 'day');

    if (!daLiJeVikend(datumIsporuke)) {
      preostaliDani--;
    }
  }

  const formatiranDatum = datumIsporuke.toISOString();

  return formatiranDatum;
};

module.exports = app;