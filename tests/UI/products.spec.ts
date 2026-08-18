import {test} from 'playwright/test'
import { LoginPage } from '../../Pages/Login'
import { ProductPage } from '../../Pages/Product';
import { CartPage } from '../../Pages/CartPage';
import { AddProducts } from '../../testData/UI/AddProducts.ts';
import { RemoveProducts } from '../../testData/UI/RemoveProducts.ts';
import {config} from '../../config/env.ts'

test.beforeEach("Login", async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.navigateToURL(config.ui.baseUrl)
    await loginPage.login(config.ui.username, config.ui.password)

})

test("Scenario 5: Multiple Products / Cart Validation", {tag: ['@ui']},async({page})=>{
    const productPage = new ProductPage(page)
    await productPage.addProductsToCart(AddProducts)
    await productPage.removeProducts(RemoveProducts)
    const cartPage = new CartPage(page)
    await cartPage.navigateToCart()
    await cartPage.verifyFinalItemsInCart(AddProducts,RemoveProducts)
})


test("Scenario 3: Add Product to Cart", {tag: ['@ui', '@sanity', '@regression']},async({page})=>{
    const productPage = new ProductPage(page)
    await productPage.addProductsFromExcel("testData/UI/ProductList.xlsx")
    const cartPage = new CartPage(page)
    await cartPage.navigateToCart()
    await cartPage.verifyItemsInCartFromExcel("testData/UI/ProductList.xlsx")
})