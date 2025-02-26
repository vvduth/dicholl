"use client"
import { useToast } from '@/hooks/use-toast'
import { updateUserSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const UpdateUserForm = ({user}: {
    user: z.infer<typeof updateUserSchema>
}) => {
    const router = useRouter()
    const {toast} = useToast() 
    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: user
    })

  return (
    <div>UpdateUserForm</div>
  )
}

export default UpdateUserForm