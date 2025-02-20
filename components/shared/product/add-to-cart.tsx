"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CartItem } from "@/types";
import { addToCart } from "@/lib/actions/cart.actions";
const AddToCart = ({ item }: { item: CartItem }) => {
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
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      Add to cart
    </Button>
  );
};

export default AddToCart;
