import { Button } from "@/components/ui/button";
import { getOrderById } from "@/lib/actions/order.action";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const StripePaymentSuccessPage = async (props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ payment_intent: string }>;
  }) => {
    const { id } = await props.params;
    const { payment_intent: paymentIntentId } = await props.searchParams;
  
    // Fetch order
    const order = await getOrderById(id);
    if (!order) notFound();
  
    // Retrieve payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
    // Check if payment intent is valid
    if (
      paymentIntent.metadata.order_id == null ||
      paymentIntent.metadata.order_id !== order.id.toString()
    ) {
        console.log("paymentIntent.metadata.order_id", );
        console.log("order.id", order.id);
      return notFound();
    }
  
    // Check if payment is successful
    const isSuccess = paymentIntent.status === 'succeeded';
  
    if (!isSuccess) return redirect(`/order/${id}`);

  return <div className="max-w-4xl w-full mx-auto space-y-8 ">
    <div className="flex flex-col gap-6 items-center">
        <h1 className="h1-bold">
            Thanks for your purchase
        </h1>
        <div>We are processing your order</div>
        <Button asChild >
            <Link   href={`/order/${order.id}`}>
                <span>View order</span>
                </Link>
        </Button>
    </div>
  </div>;
};

export default StripePaymentSuccessPage;
