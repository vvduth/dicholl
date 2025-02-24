import {generateToken, paypal} from "../lib/paypal"

// test to generate access token from paypal
test('generate access token', async () => {
    const token = await generateToken()
    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
})

// test to creat paypal order
test('create paypal order', async () => {
    const token = await generateToken()
    const price = 10.0

    const orderresponse = await paypal.createOrder(price)
    
    expect(orderresponse).toBeDefined()
    expect(orderresponse.id).toBeDefined()
    expect(orderresponse).toHaveProperty('status')
    expect(orderresponse.status).toBe('CREATED')
})

/// test to capture paymenmt with a mock order 
test('simualte capture paypal payment froman order', async () => {
    const orderId = 'mock-order-id'
    const mockCapturePayment = jest.spyOn(paypal, 'capturePayment').mockResolvedValue({
        status: 'COMPLETED'
    })

    const captureRes = await paypal.capturePayment(orderId)
    expect(captureRes).toBeDefined()
    expect(captureRes.status).toBe('COMPLETED')
    
    mockCapturePayment.mockRestore()
})