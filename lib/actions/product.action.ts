"use server"
import {  formatError } from '@/lib/utils';
import { covertoPlainObj } from "../utils";
import { PAGE_SIZE, PRODUCT_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";
import { revalidatePath } from 'next/cache';


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


// get all products admin
export async function getAllProducts({
    query, 
    limit = PAGE_SIZE,
    page, category
}: {
    query: string;
    limit?: number;
    page: number;
    category?: string;
}) {
    const data = await prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
    })

    const dataCount = await prisma.product.count();
    return {
        data,
        totalPages: Math.ceil(dataCount / limit),
    }
}

export async function deleteProduct(id:string) {
    try {
        const productExist = await prisma.product.findFirst({
            where: {
                id
            }
        })

        if (!productExist) {
            throw new Error("Product not found")
        }

        await prisma.product.delete({
            where: {
                id 
            }
        })

        revalidatePath('/admin/products')
        return {
            success: true,
            message: "Product deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}