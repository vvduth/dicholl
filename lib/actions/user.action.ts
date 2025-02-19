"use server"
import { signInFormSchema } from "../validators"
import { signIn, signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"

// sign in user with credentials

export async function signInWithCredentials(prevState: unknown, formdata: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formdata.get('email') as string,
            password: formdata.get('password') as string
        })

        await signIn('credentials', {user})
        return {success: true, message: 'Sign in successful'}
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        return {success: false, message: "Invalud email or password"}
    }
}

// sign out user
export async function signOutUser() {  
    await signOut()
    return {success: true, message: 'Sign out successful'}  
 }