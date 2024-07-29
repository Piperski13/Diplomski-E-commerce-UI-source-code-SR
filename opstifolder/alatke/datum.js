import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import sr from 'https://unpkg.com/dayjs@1.11.10/esm/locale/sr.js';

dayjs.locale(sr);

export function prikaziDatumNarudzbine(datumPorudžbine){
  let podaciString = dayjs(datumPorudžbine);
  const podaciStringFormat = podaciString.format(
    'MMMM D'
  );
return podaciStringFormat;
};

export function prikaziDatumPorudžbinePracenje(datumPorudžbine){
  let podaciString = dayjs(datumPorudžbine);
  const podaciStringFormat = podaciString.format(
    'dddd, MMMM D'
  );
return podaciStringFormat;
};

export function trakaNapretka(porudzbina,dostava){
  let trenutnoVreme = dayjs();
  let vremePorudžbine = dayjs(porudzbina);
  let vremeDostave = dayjs(dostava);
  const procenatNapretka = (trenutnoVreme - vremePorudžbine) / (vremeDostave - vremePorudžbine) * 100;
  return procenatNapretka;
}