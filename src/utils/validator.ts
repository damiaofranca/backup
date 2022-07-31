import { deepCopyFunction } from "./functions";

export default function validator(products: any[], offers: { [x: string]: any } = {}): string | void {
  const syncProducts = deepCopyFunction(products);
  const syncOffers = deepCopyFunction(offers);

  if (Object.keys(syncOffers).length > syncProducts.length) {
    return "Existe ofertas não atreladas a um produto!";
  }

  for (let i = 0, l = products.length; i < l; i++) {
    const product = products[i];

    if (!syncOffers[product.id]) {
      syncOffers[product.id] = [];
    }

    if (!product.allowFranchiseSelect) {
      const rules = product.rule || product.rules || {};
      const { min = 0, max = 99999 } = rules;
      const offersForThisProducts = syncOffers[product.id] || [];

      if (offersForThisProducts.length < min) {
        return `O produto "#${product.id} - ${product.name}" ` +
          `deve possui pelo menos ${min} oferta(s)!`;
      }

      if (offersForThisProducts.length > max) {
        return `O produto "#${product.id} - ${product.name}" ` +
          `deve possui no máximo ${max} oferta(s)!`;
      }
    }
  }

  return void 0;
}
