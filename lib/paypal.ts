
const base  = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'

export const paypal =  {
    createOrder: async function createOrder(price:number) {
        const accessToken = await generateToken()
        const url = `${base}/v2/checkout/orders`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'EUR',
                        value: price
                    }
                }]
            })
        })
        return await handleResponse(response)
    },
    capturePayment: async function capturePayment(orderId:string) {
        const accessToken = await generateToken()
        const url = `${base}/v2/checkout/orders/${orderId}/capture`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
        return handleResponse(response)
    }
}

// generat eaccess token 
export async function generateToken() {
    const {PAYPAL_SECRET, PAYPAL_CLIENT_ID} =  process.env
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')

    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${auth}`
        },
        body: 'grant_type=client_credentials'
    })

    const jsonData = await handleResponse(response)
    return jsonData.access_token
}

async function handleResponse(response:Response) {
    if (response.ok) {
        return await response.json()
    } else {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
}