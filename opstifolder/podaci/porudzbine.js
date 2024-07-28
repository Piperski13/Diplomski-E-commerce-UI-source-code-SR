export let porudzbine = JSON.parse(localStorage.getItem('porudzbine')) || [];

export function dodajPorudzbinu(porudzbina){
  porudzbine.unshift(porudzbina);
  sačuvajUSkladište();
};

export function izbrisiIzPorudzbine(porudzbinaId){
  let novePorudzbine = porudzbine.filter((porudzbinaArtikal) => porudzbinaArtikal.id !== porudzbinaId) //returns 
  porudzbine = novePorudzbine;
  sačuvajUSkladište();
}

function sačuvajUSkladište(){
  localStorage.setItem('porudzbine',JSON.stringify(porudzbine));
}