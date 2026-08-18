import {expect} from 'playwright/test'
import Ajv from 'ajv'

export class schemaValidator{

    static async validateSchema(response: any, expectedSchema: any){
    const responseBody = await response.json();
    const ajv = new Ajv({
  allErrors: true,
  strict: false
});
    const validate = ajv.compile(expectedSchema);
    const isValid = validate(responseBody)

    await expect(isValid).toBeTruthy()
  }
}