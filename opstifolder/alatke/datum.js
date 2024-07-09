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
// orders i dostava rename lome porucbina opcije na porucbina renderovanju
export function trakaNapretka(porucbina,dostava){
  let trenutnoVreme = dayjs();
  let vremePorudzbine = dayjs(porucbina);
  let vremeDostave = dayjs(dostava);
  const procenatNapretka = (trenutnoVreme - vremePorudzbine) / (vremeDostave - vremePorudzbine) * 100;
  return procenatNapretka;
}