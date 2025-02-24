const base  = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'

export const paypal =  {}

// generat eaccess token 
async function generateToken() {
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

    if (response.ok) {
        const jsondata = await response.json()
        return jsondata.access_token
    } else {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
}