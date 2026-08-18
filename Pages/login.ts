import {Locator, Page} from 'playwright/test'

export class LoginPage{

    readonly page: Page
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator
    readonly errorBox: Locator
    readonly inventoryList: Locator


    constructor(page: Page){
        this.page = page;
        this.emailField = page.getByRole('textbox', {name: "Username"})
        this.passwordField = page.getByRole('textbox', {name: "Password"})
        this.loginButton = page.getByRole('button', {name:"Login"})
        this.errorBox = page.locator("[data-test=error]")
        this.inventoryList = page.locator("[data-test=inventory-list]")
    }

    async navigateToURL(url:string){
        await this.page.goto(url, {waitUntil: "domcontentloaded", timeout: 30000});
    }

    async login(username: string, password: string){
        
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }


}