export let porudzbine = JSON.parse(localStorage.getItem('porudzbine')) || [];

export function dodajPorudzbinu(porudzbina){
  porudzbine.unshift(porudzbina);
  sacuvajUSkladiste();
};

export function removeFromOrders(orderId){
  let newOrders = porudzbine.filter((orderItem) => orderItem.id !== orderId) //returns 
  porudzbine = newOrders;
  sacuvajUSkladiste();
}

function sacuvajUSkladiste(){
  localStorage.setItem('porudzbine',JSON.stringify(porudzbine));
}