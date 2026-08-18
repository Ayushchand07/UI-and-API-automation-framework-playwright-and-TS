import {expect} from 'playwright/test'

export class statusCodeValidator{

    static async validateStatusCode(response: any, expectedStatusCode: number){
    expect(response.status()).toBe(expectedStatusCode);
  }
}