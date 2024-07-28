import {formatiranjeValute} from "../alatke/rsdFormat.js";
export class Proizvod{
  id;
  slika;
  naziv;
  ocena;
  cenaDinari;
  ključneReči;

  constructor(detaljiProizvoda){
    this.id = detaljiProizvoda.id;
    this.slika = detaljiProizvoda.slika;
    this.naziv = detaljiProizvoda.naziv
    this.ocena = detaljiProizvoda.ocena;
    this.cenaDinari = detaljiProizvoda.cenaDinari;
    this.ključneReči = detaljiProizvoda.ključneReči;
  }
  uzmiZvezdiceUrl(){
    return `slike/ocene/ocena-${this.ocena.zvezde*10}.png`;
  }
  uzmiOcenu(){
    return `${this.ocena.broj}`;
  }
  uzmiCenu(){
    return `${formatiranjeValute(this.cenaDinari)} <span class="rsd-stil">RSD</span>`;
  }
  dodatniInfoHTML(){
    return '';
  }
}

export class Odeća extends Proizvod {
  linkVeličinaTabele;
  constructor(detaljiProizvoda){
    super(detaljiProizvoda);
    this.linkVeličinaTabele = detaljiProizvoda.linkVeličinaTabele;
  }
  dodatniInfoHTML(){
    return `<a href="${this.linkVeličinaTabele}" target=_blank >Dostupne veličine</a>`;
  }
}

export let proizvodi = [];

export function učitavanjeProizvoda(){
  const promise = fetch('http://127.0.0.1:3000/proizvodi').then((response)=>{
    return response.json();
  }).then((detaljiProizvoda)=>{
    proizvodi = detaljiProizvoda.map((detaljiProizvoda)=>{

      if(detaljiProizvoda.tip === "odeća"){
        return new Odeća(detaljiProizvoda);
      }

      return new Proizvod(detaljiProizvoda);
    });

    console.log('Proizvodi očitani');

  }).catch((error)=>{
    console.log('Neočekivana greška, molimo pokušajte ponovo kasnije.');
    console.log(error);
  });

  return promise;
};
