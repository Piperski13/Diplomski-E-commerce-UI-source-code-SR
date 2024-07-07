// export function formatCurrency(priceCents){
//   return (Math.round(priceCents) / 100).toFixed(2);
// }
export function formatCurrency(priceDinari) {
  return priceDinari.toLocaleString('sr-RS', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
