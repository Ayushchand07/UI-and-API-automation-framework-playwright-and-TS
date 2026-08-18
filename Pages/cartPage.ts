import { Locator, Page, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import { getRemoveProductLocator } from '../utils/UI/getLocators';


export class CartPage{

    readonly page: Page
    readonly checkoutButton: Locator
    readonly continueShoppingButton: Locator
    readonly cartIcon: Locator
    readonly cartHeading: Locator
    readonly checkoutHeading: Locator
    readonly cartList: Locator

    constructor(page: Page){
       this.page = page;
       this.checkoutButton = page.getByRole('button', {name: 'Checkout'})
       this.continueShoppingButton = page.getByRole('button',{name: 'Go back Continue Shopping'})
       this.cartIcon = page.locator('[data-test=shopping-cart-link]')
       this.cartHeading = page.getByText("Your Cart");
       this.checkoutHeading = page.getByText("Checkout: Your Information")
       this.cartList = page.locator('[data-test=cart-list]')
    }


   async removeProductFromCart(removeItems: string []){
      for (const item of removeItems){
         const removeButton = this.page.locator(getRemoveProductLocator(item));
         await removeButton.click()
         await removeButton.waitFor({ state: 'hidden' });
         await expect(this.cartList.getByText(item, { exact: true })).toHaveCount(0);
      }
   }

   async verifyFinalItemsInCart(itemsAdded: string[], itemsRemoved: string[]){
      const remainingItems = itemsAdded.filter(item => !itemsRemoved.includes(item));
      for (const item of remainingItems){
         await expect(this.cartList.getByText(item, {exact:true})).toBeVisible()
      }
      for (const item of itemsRemoved){
         await expect(this.cartList.getByText(item, {exact:true})).toHaveCount(0)
      }
   }

   async verifyItemsInCartFromExcel(excelPath: string){
      const workbook = XLSX.readFile(excelPath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    
      for (const row of rows) {
        const productName = String(row.ProductName ?? row.product_name ?? '').trim();
    
        if (!productName) continue;
    
        const product = this.page.locator('[data-test=cart-list]').getByText(productName, {exact: true})

        await expect(product).toBeVisible()
      }
   }

   async navigateToCart(){
    await this.cartIcon.click()
    await expect (this.cartHeading).toBeVisible()
   }

   async navigateToCheckout(){
      await this.checkoutButton.click()
      await expect (this.checkoutHeading).toBeVisible()
   }
}