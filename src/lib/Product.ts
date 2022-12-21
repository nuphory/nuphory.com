import dotenv from "dotenv";

// get printful api key from .env file using dotenv
dotenv.config({path: ".env", debug: true});
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
console.log(PRINTFUL_API_KEY);


const endpoint = "https://printful.com/api/products";


export async function fetchProducts() {

    // prinftul api endpoint
    const endpoint = "https://api.printful.com/products";

    const headers = {
        "Authorization": `Basic ${PRINTFUL_API_KEY}`,
        "Content-Type": "application/json",
    }

    try {
        const response = await fetch(endpoint, {
            headers,
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }

}