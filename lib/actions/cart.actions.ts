"use server"
import { CartItem } from "@/types"
export async function addToCart(item: CartItem) {
    return  {
        success: true, 
        message: "Item added to cart"
    }
}