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

function daLiJeVikend(datum) {
  const danUNedelju = datum.format('dddd');
  return danUNedelju === 'Subota' || danUNedelju === 'Nedelja';
}
//if its weekend skip it and return the value of dostava date 
export function izracunajDatumDostave(opcijaDostave){
  let preostaliDani = opcijaDostave; //its equal to 7 or 3 or 1
  let datumIsporuke = dayjs();
  while (preostaliDani > 0) {
    datumIsporuke = datumIsporuke.add(1, 'day');

    if (!daLiJeVikend(datumIsporuke)) {
      preostaliDani--;
    }
  }

  const datumNiz = datumIsporuke.format(
    'dddd, MMMM D'
  );

  return datumNiz;
}
