export function formatiranjeValute(priceDinari) {
  return priceDinari.toLocaleString('sr-RS', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
