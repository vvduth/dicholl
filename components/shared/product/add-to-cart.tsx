"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Cart, CartItem } from "@/types";
import { addToCart, removeFromCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const res = await addToCart(item);

    if (!res.success) {
      toast({
        title: "Error",
        variant: "destructive",
        description: res.message,
      });
      return;
    }

    // handle success add to cart
    toast({
      description: res.message,
      action: (
        <ToastAction
          className="bg-primary text-white hover:bg-gray-800"
          altText="Go to cart"
          onClick={() => router.push("/cart")}
        >
          Go to cart
        </ToastAction>
      ),
    });
  };

  const handleRemoveFromCart = async () => {
    const res = await removeFromCart(item.productId); 
    toast({
      variant: res.success ? "default" : "destructive",
      description: res.message,
    })

    return
  };

  // check if item is in the cart
  const existItem =
    cart && cart.items.find((i) => i.productId === item.productId);
  return existItem ? (
    <div>
      <Button type="button" variant={"outline"} onClick={handleRemoveFromCart}>
        <Minus size={4} />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant={"outline"} onClick={handleAddToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add to cart
    </Button>
  );
};

export default AddToCart;
