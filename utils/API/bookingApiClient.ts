import { APIRequestContext } from "@playwright/test";
import { bookingEndpoints } from './bookingEndPoints.ts'
import {bookingApiconfig} from '../../config/bookingApi.ts'

export class BookingApiClient {

    constructor(private request: APIRequestContext) {}

    async createToken(username: string | undefined, password: string | undefined){

        if(!username){
            throw new Error ("Booking API Username  is not defined in .env file")
        }
        if(!password){
            throw new Error ("Booking API Password is not defined in .env file")
        }

        return await this.request.post(`${bookingApiconfig.bookingApiBaseUrl}${bookingEndpoints.auth}`, 
            {
                data:{
            "username": username,
            "password" : password
                }
        })
    }

    async createBooking(data: object) {

        return await this.request.post(
            `${bookingApiconfig.bookingApiBaseUrl}${bookingEndpoints.createBooking}`,
            {
                data: data
            }
        );
    }

    async getBooking(id: number) {

        const endpoint = bookingEndpoints.getBooking.replace("{id}", id.toString());

        return await this.request.get(`${bookingApiconfig.bookingApiBaseUrl}${endpoint}`);
    }

    async updateBooking(id: number,data: object,token: string){
        const endpoint = bookingEndpoints.updateBooking.replace("{id}", id.toString());

        return await this.request.put(`${bookingApiconfig.bookingApiBaseUrl}${endpoint}`, {
            data: data,
            headers: {
                Cookie: `token=${token}`
            }
        });
    }

    async deleteBooking(id: number,token: string){
        
        const endpoint = bookingEndpoints.deleteBooking.replace("{id}", id.toString());

        return await this.request.delete(`${bookingApiconfig.bookingApiBaseUrl}${endpoint}`, {
            headers: {
            Cookie: `token=${token}`
        }
        })
    }
}