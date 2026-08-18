import {test, expect} from 'playwright/test'
import { LoginPage } from '../../Pages/Login'
import {config} from '../../config/env.ts'

test("Scenario 1: Valid Login",{tag: ['@ui', '@regression']}, async({page})=>{

    const loginPage = new LoginPage(page);
    await loginPage.navigateToURL(config.ui.baseUrl)
    await loginPage.login(config.ui.username, config.ui.password)
    await expect(loginPage.inventoryList).toBeVisible()

})

test("Scenario 2: Invalid Login", {tag: ['@ui', '@regression']},async({page})=>{

    const loginPage = new LoginPage(page);
    await loginPage.navigateToURL(config.ui.baseUrl)
    await loginPage.login("Incorrect_Email", "Incorrect_Password")
    await expect (loginPage.errorBox).toBeVisible()

})