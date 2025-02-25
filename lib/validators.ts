import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?/.test(formatNumberWithDecimal(Number(value))),
    "Price must be a valid number"
  );

// Schema for creating product

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(255),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(255),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(255),
  brand: z.string().min(3, "Brand must be at least 3 characters").max(255),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
// Schema for updating products
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, 'Id is required'),
});

// schem for sign user in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// schem for sign user up
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").max(255),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  // cart schema

// Cart Schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  qty: z.number().int().nonnegative('Quantity must be a positive number'),
  image: z.string().min(1, 'Image is required'),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'Session cart id is required'),
  userId: z.string().optional().nullable(),
});


export const shippingAddressSchema = z.object({ 
  fullName: z.string().min(3, 'Full name must be at least 3 characters'), 
  streetAddress: z.string().min(3, 'Street address must be at least 3 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  //phoneNumber: z.string().min(3, 'Phone number must be at least 3 characters'),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(), 
})

// Schema for payment method
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Payment method is required'),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
  });

// scheme for insert oreder
export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User id is required'),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data),{
    message: 'Invalid payment method',
  }),
  shippingAddress: shippingAddressSchema,
})

// schea for inserting order item
export const insertOrderItemSchema = z.object({
  productId: z.string().min(1, 'Product id is required'),
  name: z.string().min(1, 'Name is required'),
  image: z.string().min(1, 'Image is required'),
  slug: z.string().min(1, 'Slug is required'),
  qty: z.number(),
  price: currency,
})

export const paymentresultSchema = z.object({ 

  id: z.string(),
  status: z.string(),
  email_address: z.string(), 
  pricePaid: z.string()
})

// schema for update user profile
export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(255),
  email: z.string().min(3, 'Invalid email address'), 
})

