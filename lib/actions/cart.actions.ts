"use server"
import { CartItem } from "@/types"
import { formatError } from "../utils"
import { cookies } from "next/headers"
export async function addToCart(item: CartItem) {
    try {

        // check for the cart cookie
        const sessioncartId = (await cookies()).get('sessionCartId')?.value

        // Testing
        console.log(sessioncartId)

        return  {
            success: true, 
            message: "Item added to cart"
        } 
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}