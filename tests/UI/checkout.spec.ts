import {test, expect} from 'playwright/test'
import { LoginPage } from '../../Pages/Login'
import { ProductPage } from '../../Pages/Product';
import { CartPage } from '../../Pages/CartPage';
import { randomFirstName, randomLastName, randomNumber } from '../../utils/UI/TestDataGenerator'
import { CheckoutPage } from '../../Pages/CheckoutPage';
import { AddProducts } from '../../testData/UI/AddProducts';
import {config} from '../../config/env.ts'

const firstName = randomFirstName();
const lastName = randomLastName();
const pincode = randomNumber().toString();


test.beforeEach("Login", async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.navigateToURL(config.ui.baseUrl)
    await loginPage.login(config.ui.username, config.ui.password)

})

test("Scenario 4: Checkout",{tag: ['@ui', '@regression']}, async({page})=>{
    const productPage = new ProductPage(page)
    await productPage.addProductsToCart(AddProducts)
    const cartPage = new CartPage(page)
    await cartPage.navigateToCart()
    await cartPage.verifyFinalItemsInCart(AddProducts,[])
    await cartPage.navigateToCheckout();
    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.fillCheckoutDetails(firstName, lastName, pincode)
    await checkoutPage.continueCheckout()
    await checkoutPage.finishCheckout()
    await expect (checkoutPage.checkoutSuccessMessage).toBeVisible()
})