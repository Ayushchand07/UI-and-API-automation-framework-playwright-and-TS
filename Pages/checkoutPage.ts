import { Locator, Page } from '@playwright/test';


export class CheckoutPage{

    readonly page: Page
    readonly firstNameField: Locator
    readonly lastNameField: Locator
    readonly postalCodeField: Locator
    readonly continueButton : Locator
    readonly cancelButton: Locator
    readonly finishButton: Locator
    readonly checkoutSuccessMessage : Locator

    constructor(page: Page){
       this.page = page;
       this.firstNameField= page.getByRole('textbox', {name: "First Name"})
       this.lastNameField= page.getByRole('textbox', {name: "Last Name"})
       this.postalCodeField = page.getByRole('textbox', {name: "Zip/Postal Code"})
       this.continueButton = page.getByRole('button', {name: "Continue"})
       this.cancelButton = page.getByRole('button', {name: "Cancel"})
       this.finishButton = page.getByRole('button', {name: "Finish"})
       this.checkoutSuccessMessage = page.getByText("Thank you for your order!")
    }

    async fillCheckoutDetails(firstname: string, lastname: string, postalCode: string){
        await this.firstNameField.fill(firstname);
        await this.lastNameField.fill(lastname);
        await this.postalCodeField.fill(postalCode);
    }

    async continueCheckout(){
        await this.continueButton.click()
    }

    async finishCheckout(){
        await this.finishButton.click();
    }
}