"use server"
import { PrismaClient } from "@prisma/client"
import { covertoPlainObj } from "../utils";
import { PRODUCT_LIMIT } from "../constants";

// Get lates products 
export async function getLatestProducts() {
    const prisma = new PrismaClient()
    const data = await prisma.product.findMany({
        take: PRODUCT_LIMIT,
        orderBy: {
            createdAt: 'desc'
        }
    })
    return covertoPlainObj(data);
}