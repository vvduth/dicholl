import React from 'react'
import { Card, CardContent } from './ui/card'
import { DollarSign, Headset, ShoppingBag, WalletCards } from 'lucide-react'

const IconBoxes = () => {
  return (
    <Card>
        <CardContent className='grid md:grid-cols-4 gap-4 p-4'>
            <div className='space-y-2'>
                <ShoppingBag />
                <div className='text-sm font-bold'>
                    Free shipping
                </div>
                <div className='text-sm text-muted-foreground'>
                    On all orders over 100 euros
                </div>
            </div>
            <div className='space-y-2'>
                <DollarSign />
                <div className='text-sm font-bold'>
                    Money back guarantee
                </div>
                <div className='text-sm text-muted-foreground'>
                    Within 30 day of purchase
                </div>
            </div>
            <div className='space-y-2'>
                <WalletCards />
                <div className='text-sm font-bold'>
                    Flexible payment
                </div>
                <div className='text-sm text-muted-foreground'>
                    Paywith credit card or PayPal
                </div>
            </div>
            <div className='space-y-2'>
                <Headset />
                <div className='text-sm font-bold'>
                    24/7 customer support
                </div>
                <div className='text-sm text-muted-foreground'>
                    Get Support ay any time.
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default IconBoxes