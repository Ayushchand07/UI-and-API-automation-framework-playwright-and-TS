const requiredEnvVariables = [
    "BASE_URL",
    "USER_NAME",
    "PASSWORD",

    "API_BASE_URL",
    "API_AUTH",
    "GET_BOOKING",
    "CREATE_BOOKING",
    "UPDATE_BOOKING",
    "DELETE_BOOKING",

    "BOOKING_API_USERNAME",
    "BOOKING_API_PASSWORD"
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(
            `Required environment variable "${variable}" is missing.`
        );
    }
}

export const config = {
    ui: {
        baseUrl: process.env.BASE_URL!,
        username: process.env.USER_NAME!,
        password: process.env.PASSWORD!
    },

    api: {
        baseUrl: process.env.API_BASE_URL!,
        auth: process.env.API_AUTH!,
        username: process.env.BOOKING_API_USERNAME!,
        password: process.env.BOOKING_API_PASSWORD!,

        endpoints: {
            getBooking: process.env.GET_BOOKING!,
            createBooking: process.env.CREATE_BOOKING!,
            updateBooking: process.env.UPDATE_BOOKING!,
            deleteBooking: process.env.DELETE_BOOKING!
        }
    }
};