"use client"
import React from 'react'
import { createOrder } from '@/lib/actions/order.action'
import { useFormStatus } from 'react-dom'
import { Check , Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'

const PlaceOrderForm = () => {
    const router = useRouter()

    const handleSubmit = ( ) => {
        return 
    }
    const PlaceOrderButton = () => {
        const {pending} = useFormStatus()
        return(
            <Button disabled={pending} className='w-full h-full'>
                {pending ? <Loader 
                 className='w-4 h-4 animate-spin'
                /> : <Check 
                className='w-4 h-4'
                />}
                Place Order
            </Button>
        )
    }
    return (
    <form className='w-full'
        onSubmit={handleSubmit}
    ></form>
  )
}

export default PlaceOrderForm
