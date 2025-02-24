"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { formatError } from "../utils"
import { auth } from "@/auth"
import { getMycart } from "./cart.actions"
import { getUserById } from "./user.action"
import { insertOrderSchema } from "../validators"
import { prisma } from "@/db/prisma"
import { CartItem } from "@/types"
import { redirect } from "next/dist/server/api-utils"

// create order and creae order item
export async function createOrder() {
    try {
        const session = await auth()
        if (!session) {
            throw new Error("User not found")
        }

        const cart = await getMycart()
        const userId = session?.user?.id

        if (!userId) {
            throw new Error("User not found")
        }

        const user = await getUserById(userId)

        if (!cart || !cart.items || cart.items.length === 0) {
            return {
                success: false,
                message: "Cart is empty",
                redirectTo: "/cart"
            }
        }

        if (!user.address) {
            return {
                success: false,
                message: "Shipping address not found",
                redirectTo: "/shipping-address"
            }
        }

        if (!user.payment) {
            return {
                success: false,
                message: "Payment method not found",
                redirectTo: "/payment-method"
            }
        }
        
        // create order
        const order = insertOrderSchema.parse({
            userId: user.id,
            shippingAddress: user.address, 
            paymentMethod: user.payment,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        })

        // create a transaction to create order and order item to the database
        const insertedOrderId =  await prisma.$transaction(async(tx) => {
            const insertedOrder =  await tx.order.create({
                data: order
            })

            // create order item from the cart
            for ( const item of cart.items as CartItem[]) {
                await tx.orderItem.create({
                    data: {
                        ...item, 
                        price: item.price,
                        orderId: insertedOrder.id, 
                    }
                })
            }

            // clear the cart
            await tx.cart.update({
                where: {id: cart.id},
                data: {
                    items: [],
                    totalPrice: 0,
                    taxPrice: 0, 
                    shippingPrice: 0,
                    itemsPrice: 0
                }
            })
            
            return insertedOrder.id

        })

        if (!insertedOrderId) {
            return {
                success: false,
                message: "Failed to create order"
            }
        }

        return {
            success: true,
            message: "Order created successfully",
            redirect: `/order/${insertedOrderId}`
        }
        
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        return {success: false, message: formatError(error)}
    }
}