export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
};

export function removeFromOrders(orderId){
  let newOrders = orders.filter((orderItem) => orderItem.id !== orderId) //returns 
  orders = newOrders;
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}