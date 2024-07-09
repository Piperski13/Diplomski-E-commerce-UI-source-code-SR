export let porudzbine = JSON.parse(localStorage.getItem('porudzbine')) || [];

export function dodajPorudzbinu(porudzbina){
  porudzbine.unshift(porudzbina);
  sacuvajUSkladiste();
};

export function izbrisiIzPorudzbine(porudzbinaId){
  let novePorudzbine = porudzbine.filter((porudzbinaArtikal) => porudzbinaArtikal.id !== porudzbinaId) //returns 
  porudzbine = novePorudzbine;
  sacuvajUSkladiste();
}

function sacuvajUSkladiste(){
  localStorage.setItem('porudzbine',JSON.stringify(porudzbine));
}