"use server";
import { CartItem } from "@/types";
import { covertoPlainObj, formatError, roundToTwo } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

const calPrice = (items: CartItem[]) => {
    const itemsPrice = roundToTwo(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = itemsPrice > 100 ? 0 : 10,
    taxPrice = roundToTwo(itemsPrice * 0.15),
    totalPrice = roundToTwo(itemsPrice + shippingPrice + taxPrice);

    return  {
        itemsPrice : itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
    }
  };
export async function addToCart(data: CartItem) {
  try {
    // check for the cart cookie
    const sessioncartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessioncartId) {
      throw new Error("No cart found");
    }

    // Get session and user id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // get cart from database
    const cart = await getMycart();

    // oarfe and validate items
    const item = cartItemSchema.parse(data);

    // find product in the database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) { 
        throw new Error("Product not found");

    }

    if (!cart) {
        // create cart
        const newCart = insertCartSchema.parse({
          userId: userId,
          items: [item],
          sessionCartId: sessioncartId,
          ...calPrice([item]),
        });

        
        await prisma.cart.create({
            data: newCart,
        })

        // revalidate the product page
        revalidatePath(`/product/${product.slug}`);
        return {
            success: true,
            message: `${product.name} added to cart`,
        };
    } else {
        // check if tem is already in the cart
        const existItem = (cart.items as CartItem[]).find((x) => x.productId === item.productId);
        if (existItem) {
            // check the stock 
            if (product.stock < existItem.qty + 1) {
                throw new Error("Product out of stock");
            }
            // increase the qty
            (cart.items as CartItem[]).find((x) => x.productId === item.productId)!.qty = existItem.qty + 1;
        } else {
            // If item not existing
            // check the stock
            if (product.stock < 1) {
                throw new Error("Product out of stock");
            }
            // add item to the cart.items
            cart.items.push(item);

            
        }
        // save to the db
        await prisma.cart.update({
            where: {id: cart.id},
            data: {
                items: cart.items as Prisma.CartUpdateitemsInput[],
                ...calPrice(cart.items as CartItem[]),
            }
        })

        revalidatePath(`/product/${product.slug}`);
        return {
            success: true,
            message: `${product.name} ${existItem ? 'updated in' : 'added to'} cart`,
        }
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMycart() {
  // check for the cart cookie
  const sessioncartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessioncartId) {
    throw new Error("No cart found");
  }

  // Get session and user id
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // get user'cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessioncartId },
  });

  if (!cart) {
    return undefined;
  }

  // covert decimal to return
  return covertoPlainObj({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}


export async function removeFromCart(productId: string) {
    try {
        
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        }
        
    }
}