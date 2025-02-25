import React from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata : Metadata = {
    title: "Unauthorized access"
}
const UnauthorizedPage = () => {
  return (
    <div className='container mx-auto flex flex-col
    items-center justify-center space-y-4 h-[calc(100vh-200px)]'>
        <h1 className='h1-bold text-4xl'>
            Unauthorized access
        </h1>
        <p className='text-muted-foreground'>
            You are not admin.</p>
            <Button asChild>
                <Link href={"/"}>
                Return to home</Link>
            </Button>
            </div>
  )
}

export default UnauthorizedPage