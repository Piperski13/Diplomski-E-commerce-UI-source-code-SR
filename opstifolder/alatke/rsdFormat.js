export function formatCurrency(priceDinari) {
  return priceDinari.toLocaleString('sr-RS', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
