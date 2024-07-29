export let porudžbine = JSON.parse(localStorage.getItem('porudžbine')) || [];

export function dodajPorudzbinu(porudzbina){
  porudžbine.unshift(porudzbina);
  sačuvajUSkladište();
};

export function izbrisiIzPorudžbine(porudzbinaId){
  let novePorudžbine = porudžbine.filter((porudzbinaArtikal) => porudzbinaArtikal.id !== porudzbinaId) //returns 
  porudžbine = novePorudžbine;
  sačuvajUSkladište();
}

function sačuvajUSkladište(){
  localStorage.setItem('porudžbine',JSON.stringify(porudžbine));
}