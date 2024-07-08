import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import sr from 'https://unpkg.com/dayjs@1.11.10/esm/locale/sr.js';

dayjs.locale(sr);

export function prikaziDatumNarudzbine(datumPorudzbine){
  let podaciString = dayjs(datumPorudzbine);
  const podaciStringFormat = podaciString.format(
    'MMMM D'
  );
return podaciStringFormat;
};

export function pprikaziDatumNarudzbinePracenje(datumPorudzbine){
  let podaciString = dayjs(datumPorudzbine);
  const podaciStringFormat = podaciString.format(
    'dddd, MMMM D'
  );
return podaciStringFormat;
};

export function trakaNapretka(order,delivery){
  let currentTime = dayjs();
  let orderTime = dayjs(order);
  let deliveryTime = dayjs(delivery);
  const percentProggress = (currentTime - orderTime) / (deliveryTime - orderTime) * 100;
  return percentProggress;
}