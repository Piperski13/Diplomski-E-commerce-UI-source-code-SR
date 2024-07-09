export let porudzbine = JSON.parse(localStorage.getItem('porudzbine')) || [];

export function addOrder(porucbina){
  porudzbine.unshift(porucbina);
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