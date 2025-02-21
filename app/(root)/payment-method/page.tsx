import React from "react";
import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.action";
import PaymentMethodForm from "./payment-form";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Payment Method",
  description: "Payment Method",
};

const PaymentMethod = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not found");
  }

  const user = await getUserById(userId);
  return (
    <div>
      <CheckoutSteps current={2} />
      <PaymentMethodForm preferedMethod={user.payment} />
    </div>
  );
};

export default PaymentMethod;
