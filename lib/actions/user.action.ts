"use server"
import { signInFormSchema, signUpFormSchema } from "../validators"
import { signIn, signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { hashSync } from "bcrypt-ts-edge"
import {prisma} from "@/db/prisma"
import { formatError } from "../utils"

// sign in user with credentials

export async function signInWithCredentials(prevState: unknown, formdata: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formdata.get('email') as string,
            password: formdata.get('password') as string
        })
        
        await signIn('credentials', user)
        return {success: true, message: 'Sign in successful'}
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        return {success: false, message: "Invalid email or password"}
    }
}

// sign out user
export async function signOutUser() {  
    await signOut()
    //return {success: true, message: 'Sign out successful'}  
 }


 // sign up user
export async function signUpuser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string
        })

        const plainPassword = user.password;
        user.password = hashSync(user.password, 10);

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })

        await signIn('credentials',{
            email: user.email,
            password: plainPassword
        })

        return {success: true, message: 'Sign up successful'}
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }
        return {success: false, message: formatError(error)}
    }
}

// get user by id
export async function getUserById(userId:string) {
 const user = await prisma.user.findUnique({
    where:{
        id: userId
    }
 })   
 if (!user) {
     throw new Error('User not found')
 }
 return user;
}