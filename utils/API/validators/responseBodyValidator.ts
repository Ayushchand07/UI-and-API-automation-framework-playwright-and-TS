import { APIResponse, expect } from "playwright/test";

export class responseBodyValidator{
    static async validateResponseBody(response: any, expectedResponseBody: any){
        await expect(response).toEqual(expectedResponseBody);
      }
}