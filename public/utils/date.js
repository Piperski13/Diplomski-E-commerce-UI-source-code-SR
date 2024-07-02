import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //dayjs library

export function renderDateOrder(orderDate){
  let dataString = dayjs(orderDate);
  const dataStringFormat = dataString.format(
    'MMMM D'
  );
return dataStringFormat;
};

export function renderDateOrderTracking(orderDate){
  let dataString = dayjs(orderDate);
  const dataStringFormat = dataString.format(
    'dddd, MMMM D'
  );
return dataStringFormat;
};

export function progressBar(order,delivery){
  let currentTime = dayjs();
  let orderTime = dayjs(order);
  let deliveryTime = dayjs(delivery);
  const percentProggress = (currentTime - orderTime) / (deliveryTime - orderTime) * 100;
  return percentProggress;
}



