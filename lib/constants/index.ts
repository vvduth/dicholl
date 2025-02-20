import { count } from "console"

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Dichol'
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
export const PRODUCT_LIMIT = 6

export const shippingAddressDefault = {
    fullName: "Evelulu",
    streetAddress: "123 Kaleva St",
    city: "Tampere",
    postalCode: "33100",    
    country: "Finland",
}