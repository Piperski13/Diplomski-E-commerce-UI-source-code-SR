export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(porucbina){
  orders.unshift(porucbina);
  sacuvajUSkladiste();
};

export function removeFromOrders(orderId){
  let newOrders = orders.filter((orderItem) => orderItem.id !== orderId) //returns 
  orders = newOrders;
  sacuvajUSkladiste();
}

function sacuvajUSkladiste(){
  localStorage.setItem('orders',JSON.stringify(orders));
}