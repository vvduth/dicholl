
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

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS ? process.env.PAYMENT_METHODS.split(',') : ['PayPal', 'Stripe']
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'Stripe'
export const BUSSINESS_EMAIL_PAYPAL = 'sb-lekql12845993@business.example.com'
export const PAGE_SIZE = 6
export const productDefaultValue = {
    name: "",
    description: "",
    price: '0',
    stock: 0,
    brand: "",
    category: "",
    images: [],
    rating: '0',
    numReviews: '0',
    slug: "",
    isFeatured: false,
    banner: null,
}

export const USER_ROLE = ['user', 'admin'];

export const reviewFormDefaultValue = {
    title: '',
    comment: '',
    rating: 0,
}

export const SENDER_EMAIL = process.env.SENDER_EMAIL || ''