import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import sr from 'https://unpkg.com/dayjs@1.11.10/esm/locale/sr.js';

dayjs.locale(sr);

export function prikaziDatumNarudzbine(orderDate){
  let dataString = dayjs(orderDate);
  const dataStringFormat = dataString.format(
    'MMMM D'
  );
return dataStringFormat;
};

export function pprikaziDatumNarudzbinePracenje(orderDate){
  let dataString = dayjs(orderDate);
  const dataStringFormat = dataString.format(
    'dddd, MMMM D'
  );
return dataStringFormat;
};

export function trakaNapretka(order,delivery){
  let currentTime = dayjs();
  let orderTime = dayjs(order);
  let deliveryTime = dayjs(delivery);
  const percentProggress = (currentTime - orderTime) / (deliveryTime - orderTime) * 100;
  return percentProggress;
}