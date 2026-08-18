import { APIRequestContext } from "@playwright/test";
import { bookingEndpoints } from './bookingEndPoints.ts'
import {config} from '../../config/env.ts'

export class BookingApiClient {

    constructor(private request: APIRequestContext) {}

    async createToken(username: string, password: string){

        return await this.request.post(`${config.api.baseUrl}${bookingEndpoints.auth}`, 
            {
                data:{
            "username": username,
            "password" : password
                }
        })
    }

    async createBooking(data: object) {

        return await this.request.post(
            `${config.api.baseUrl}${bookingEndpoints.createBooking}`,
            {
                data: data
            }
        );
    }

    async getBooking(id: number) {

        const endpoint = bookingEndpoints.getBooking.replace("{id}", id.toString());

        return await this.request.get(`${config.api.baseUrl}${endpoint}`);
    }

    async updateBooking(id: number,data: object,token: string){
        const endpoint = bookingEndpoints.updateBooking.replace("{id}", id.toString());

        return await this.request.put(`${config.api.baseUrl}${endpoint}`, {
            data: data,
            headers: {
                Cookie: `token=${token}`
            }
        });
    }

    async deleteBooking(id: number,token: string){
        
        const endpoint = bookingEndpoints.deleteBooking.replace("{id}", id.toString());

        return await this.request.delete(`${config.api.baseUrl}${endpoint}`, {
            headers: {
            Cookie: `token=${token}`
        }
        })
    }
}