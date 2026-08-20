import {test, expect} from 'playwright/test'
import { BookingApiClient } from '../../utils/API/bookingApiClient';
import { updateBookingData, bookingData } from '../../testData/API/bookingData';
import { statusCodeValidator } from '../../utils/API/validators/statusCodevalidator';
import { responseBodyValidator } from '../../utils/API/validators/responseBodyValidator';
import { randomNumber } from '../../utils/UI/testDataGenerator';
import getBookingSchema from '../../testData/API/schema/getBookingSchema.json'
import createBookingSchema from '../../testData/API/schema/createBookingSchema.json'
import updateBookingSchema from '../../testData/API/schema/updateBookingSchema.json'
import { schemaValidator } from '../../utils/API/validators/schemaValidator.ts';
import {config} from '../../config/env.ts'

let client: BookingApiClient
const username = config.api.username
const password = config.api.password

test.beforeEach(async({request})=>{
    client = new BookingApiClient(request);
})

test("Scenario 1 – Get Booking",{tag: ['@api', '@sanity', '@regression']}, async({})=>{
    const rs = await client.createBooking(bookingData)
    await statusCodeValidator.validateStatusCode(rs, 200);
    const createResponseBody = await rs.json()
    const bookingId = createResponseBody.bookingid
    const rs1 = await client.getBooking(bookingId)
    await statusCodeValidator.validateStatusCode(rs1, 200);
    const getBookingResponseBody = await rs1.json()
    await responseBodyValidator.validateResponseBody(getBookingResponseBody,bookingData)
    await schemaValidator.validateSchema(rs1, getBookingSchema)

})


test("Scenario 2 – Create Booking", {tag: ['@api']},async({})=>{
    const rs = await client.createBooking(bookingData)
    await statusCodeValidator.validateStatusCode(rs, 200);
    await schemaValidator.validateSchema(rs, createBookingSchema)
})

test("Scenario 3 – Update Booking", {tag: ['@api']}, async({})=>{
    const rs = await client.createBooking(bookingData)
    await statusCodeValidator.validateStatusCode(rs, 200);
    const createBookingResponseBody = await rs.json()
    const bookingId = createBookingResponseBody.bookingid
    await responseBodyValidator.validateResponseBody(createBookingResponseBody.booking, bookingData)

    const authRs = await client.createToken(username, password)
    const authResponseBody = await authRs.json()
    const authToken = authResponseBody.token

    const updateRs = await client.updateBooking(bookingId, updateBookingData, authToken )
    const updateBookingResponseBody = await updateRs.json()
    await statusCodeValidator.validateStatusCode(updateRs,200)
    await responseBodyValidator.validateResponseBody(updateBookingResponseBody,updateBookingData)
    await schemaValidator.validateSchema(updateRs, updateBookingSchema)

})


test("Scenario 4 – Delete Booking",{tag: ['@api', '@sanity',]}, async({})=>{
    const rs = await client.createBooking(bookingData)
    await statusCodeValidator.validateStatusCode(rs, 200);
    const createBookingResponseBody = await rs.json()
    const bookingId = createBookingResponseBody.bookingid

    const authRs = await client.createToken(username, password)
    const authResponseBody = await authRs.json()
    const authToken = authResponseBody.token

    
    const deleteRs = await client.deleteBooking(bookingId,authToken)
    await statusCodeValidator.validateStatusCode(deleteRs, 201)

    const getResponse = await client.getBooking(bookingId);
    await statusCodeValidator.validateStatusCode(getResponse,404)
    await schemaValidator.validateSchema(rs, createBookingSchema)
})

//------------------- Negative scenarios--------------------------------

// User tries to get a booking which doesn't exist

test("Scenario 5 – Get a booking which doesn't exist",{tag: ['@api', '@regression', '@negative']}, async({})=>{
   
    const bookingId = randomNumber()
    const rs = await client.getBooking(bookingId)
    const getBookingResponseBody = await rs.text()
    await statusCodeValidator.validateStatusCode(rs, 404);
    await expect( getBookingResponseBody).toContain('Not Found')
    
})

 
// User tries to delete a booking which is not present

test("Scenario 6 – Delete Booking that doesn't exist",{tag: ['@api','@regression', '@negative']}, async({})=>{
    const authRs = await client.createToken(username, password)
    const authResponseBody = await authRs.json()
    const authToken = authResponseBody.token

    const bookingId = randomNumber()
    const deleteRs = await client.deleteBooking(bookingId,authToken)
    await statusCodeValidator.validateStatusCode(deleteRs, 405)
})