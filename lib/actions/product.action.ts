"use server"

import { covertoPlainObj } from "../utils";
import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// Get lates products 
export async function getLatestProducts() {
    
    const data = await prisma.product.findMany({
        take: PRODUCT_LIMIT,
        orderBy: {
            createdAt: 'desc'
        }
    })
    return covertoPlainObj(data);
}

// Get product by slug

export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: {
            slug
        }
    })
}