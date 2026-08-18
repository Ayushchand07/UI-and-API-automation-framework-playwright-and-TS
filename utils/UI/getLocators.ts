export function getAddProductLocator(productName: string) {
  const normalized = productName.trim().toLowerCase().replace(/\s+/g, '-');
   return `[data-test="add-to-cart-${normalized}"]`;
}

export function getRemoveProductLocator(productName: string) {
  const normalized = productName.trim().toLowerCase().replace(/\s+/g, '-');
   return `[data-test="remove-${normalized}"]`;
}