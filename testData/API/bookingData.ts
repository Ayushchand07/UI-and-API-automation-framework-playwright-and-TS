import { randomFirstName, randomNumber, randomLastName  } from "../../utils/UI/TestDataGenerator";

export const bookingData = {
    firstname: "Ayush",
    lastname: "Chand",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
        checkin: "2026-08-20",
        checkout: "2026-08-25"
    },
    additionalneeds: "Breakfast"
};

export const updateBookingData = {
    firstname : randomFirstName(),
    lastname : randomLastName(),
    totalprice : randomNumber(),
    depositpaid : true,
    bookingdates : {
        checkin: "2018-01-01",
        checkout : "2019-01-01"
    },
    additionalneeds : "Breakfast, Lunch, Dinner",

}