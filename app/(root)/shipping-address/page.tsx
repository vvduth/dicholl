import React from "react";
import { auth } from "@/auth";
import { getMycart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types";
import ShippingAddressForm from "./shipping-address-form";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMycart();
  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User id not found");
  }

  const user = await getUserById(userId);
  return (
    <div>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </div>
  );
};

export default ShippingAddressPage;
