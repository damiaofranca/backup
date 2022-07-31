import { deepCopyFunction } from "./functions";

export default function parse(
  data: any,
  cb?: (values: any) => void,
  parseToFranchisee?: boolean,
  franchiseeData?: any
): any {
  const clone = deepCopyFunction(data);
  const productRoot: { [x: string]: any } = {};
  const rulesProducts: { [x: string]: any[] } = {};
  const allProductsIds: string[] = clone.products.map((v: any) => v.id);
  clone.root_products_id = (
    (clone.root_products_id || []).length
      ? clone.root_products_id
      : (clone.template.root_products_id || []).length
      ? clone.template.root_products_id || []
      : []
  ).map((v: string) => +v);

  const offers = (clone.offers || []).reduce((o: any, v: any) => {
    if (clone.custom_offers_price && v.id in clone.custom_offers_price) {
      v.custom_offers_price = +clone.custom_offers_price[v.id];
    }

    return {
      ...o,
      [v.product.id]: Array.isArray(o[v.product.id])
        ? [...o[v.product.id], v]
        : [v],
    };
  }, {});

  for (let i = 0, l = clone.products.length; i < l; i++) {
    const product = clone.products[i];
    if ((clone.root_products_id || []).includes(+product.id)) {
      product.rule = {
        min: 1,
        max: 1,
        product: deepCopyFunction(product),
      };
      productRoot[product.id] = product;
      if (parseToFranchisee) {
        product.allowFranchiseSelect = !(
          (clone.template || {}).offers || []
        ).some((o: any) => +o.product.id === +product.id);
      } else {
        product.allowFranchiseSelect = (offers[product.id] || []).length
          ? false
          : true;
      }

      if (product.combo_rules && product.combo_rules.length) {
        for (let ip = 0, il = product.combo_rules.length; ip < il; ip++) {
          const pRule = product.combo_rules[ip];
          if (!(pRule.product.id in rulesProducts)) {
            rulesProducts[pRule.product.id] = [];
          }
          rulesProducts[pRule.product.id].push({
            ...pRule.product,
            depends_on: product,
            rule: pRule,
          });
        }
      }
    }
  }

  const mergedPrds: any[] = [];

  for (const prdtId in rulesProducts) {
    if (prdtId in rulesProducts) {
      const prdts = rulesProducts[prdtId];
      if (prdts && prdts.length) {
        const first = prdts[0];
        if (first) {
          const { id, name } = first;
          let rule!: any;
          for (let i = 0, l = prdts.length; i < l; i++) {
            if (!i) {
              rule = { ...prdts[i].rule };
            } else {
              rule.min += prdts[i].rule.min || 0;
              rule.max += prdts[i].rule.max || 0;
            }
          }
          const model = {
            id,
            name,
            rule,
            join_with: deepCopyFunction(rulesProducts[prdtId]),
            allowFranchiseSelect: allProductsIds.includes(id)
              ? (
                  parseToFranchisee
                    ? ((clone.template || {}).offers || []).some(
                        (o: any) => +o.product.id === +id
                      )
                    : (offers[id] || []).length
                )
                ? false
                : true
              : false,
          };

          mergedPrds.push(model);
        }
      }
    }
  }

  let finalProducts = deepCopyFunction([
    ...Object.keys(productRoot).reduce((a: any[], v: any) => {
      return [...a, productRoot[v]];
    }, []),
    ...mergedPrds,
  ]);

  let finalOffers = deepCopyFunction(offers);

  Object.keys(finalOffers).forEach((key: string) => {
    (finalOffers[key] || []).forEach((v: any) => {
      v.double_velocity = (clone.offers_double_speed || []).some(
        (op: any) => +op === +v.id
      );
    });
  });

  // Object.keys(finalOffers).map((v: any) => {
  //   v.double_velocity = (clone.offers_double_speed || []).some((op: any) => +op === +v.id)

  //   return v;
  // });

  if (parseToFranchisee) {
    finalProducts = finalProducts.slice(0).filter((v: any) => {
      return (clone.products || []).some((op: any) => +op.id === +v.id);
    });

    // const franchiseeDataClone = deepCopyFunction(franchiseeData || {});

    // const franchiseeOffers = (clone.offers || []).forEach((v: any) => {
    //   if (clone.custom_offers_price && (v.id in clone.custom_offers_price)) {
    //     v.custom_offers_price = +clone.custom_offers_price[v.id];
    //   }

    //   finalOffers[v.product.id] = Array.isArray(finalOffers[v.product.id]) ? [...finalOffers[v.product.id], v] : [v];
    // });

    // finalOffers = {
    //   ...finalOffers,
    //   ...franchiseeOffers,
    // }
  }

  const rt = {
    products: finalProducts,
    offers: finalOffers,
  };

  cb && cb(rt);

  return rt;
}
