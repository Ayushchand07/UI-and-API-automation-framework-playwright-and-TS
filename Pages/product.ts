import { Locator, Page } from '@playwright/test';
import * as XLSX from 'xlsx';
import { getRemoveProductLocator } from '../utils/UI/getLocators';
import { getAddProductLocator } from '../utils/UI/getLocators';

export class ProductPage{

    readonly page: Page
    readonly addToCartButton: Locator
    readonly backToProductsButton: Locator


    constructor(page: Page){
        this.page = page
        this.addToCartButton = page.locator('[data-test=add-to-cart]')
        this.backToProductsButton = page.locator('[data-test=back-to-products]')
    }

   async addProductsToCart(addItems: string []){
      for(const item of addItems){
         const addButton = this.page.locator(getAddProductLocator(item));
         await addButton.click()
      }
   }

   async removeProducts(removeItems: string[]){
    for(const item of removeItems){
         const removeButton = this.page.locator(getRemoveProductLocator(item));
         await removeButton.click()
      }

   }     

async addProductsFromExcel(excelPath: string) {
  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  for (const row of rows) {
    const productName = String(row.ProductName ?? row.product_name ?? '').trim();

    if (!productName) continue;

    const product = this.page.locator('[data-test="inventory-list"]').getByText(productName, {exact: true})

    await product.click()
    await this.addToCartButton.click()
    await this.backToProductsButton.click()
  }
}

}
