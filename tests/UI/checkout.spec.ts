import {test, expect} from 'playwright/test'
import { LoginPage } from '../../Pages/login'
import { ProductPage } from '../../Pages/product';
import { CartPage } from '../../Pages/cartPage';
import { randomFirstName, randomLastName, randomNumber } from '../../utils/UI/testDataGenerator'
import { CheckoutPage } from '../../Pages/checkoutPage';
import { addProducts } from '../../testData/UI/addProducts';
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
    await productPage.addProductsToCart(addProducts)
    const cartPage = new CartPage(page)
    await cartPage.navigateToCart()
    await cartPage.verifyFinalItemsInCart(addProducts,[])
    await cartPage.navigateToCheckout();
    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.fillCheckoutDetails(firstName, lastName, pincode)
    await checkoutPage.continueCheckout()
    await checkoutPage.finishCheckout()
    await expect (checkoutPage.checkoutSuccessMessage).toBeVisible()
})