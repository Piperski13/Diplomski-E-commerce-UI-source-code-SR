import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; 
import sr from 'https://unpkg.com/dayjs@1.11.10/esm/locale/sr.js';

dayjs.locale(sr);

export const opcijeDostave = [
  {
    id: '1',
    dostaveDani: 7,
    ceneDinari: 0
  },
  {
    id: '2',
    dostaveDani: 3,
    ceneDinari: 499
  },
  {
    id: '3',
    dostaveDani: 1,
    ceneDinari: 999
  }
];

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}
//if its weekend skip it and return the value of delivery date 
export function calculateDeliveryDate(deliveryOption){
  let remainingDays = deliveryOption; //its equal to 7 or 3 or 1
  let deliveryDate = dayjs();
  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  return dateString;
}
