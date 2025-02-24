"use client"
import React from 'react'
import { createOrder } from '@/lib/actions/order.action'
import { useFormStatus } from 'react-dom'
import { Check , Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
const PlaceOrderForm = () => {
    const router = useRouter()

    const handleSubmit =async  (event: React.FormEvent ) => {
        event.preventDefault()
        const res = await createOrder()

        if (res.redirectTo) {
            router.push(res.redirectTo)
        }
    }
    const PlaceOrderButton = () => {
        const {pending} = useFormStatus()
        return(
            <Button disabled={pending} className='w-full h-full'>
                {pending ? <Loader 
                 className='w-4 h-4 animate-spin'
                /> : <Check 
                className='w-4 h-4'
                />}{' '} Place order
            </Button>
        )
    }
    return (
    <form className='w-full'
        onSubmit={handleSubmit}
    >
        <PlaceOrderButton />
    </form>
  )
}

export default PlaceOrderForm
