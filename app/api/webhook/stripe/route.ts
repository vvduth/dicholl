import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderToPaid } from "@/lib/actions/order.action";

export async function POST(req: NextRequest) {
  // buld the webhook event
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const { object } = event.data;

    await updateOrderToPaid({
      orderId: object.metadata.order_id,
      paymentResult: {
        id: object.id,
        status: "COMPLETED",
        email_address: object.billing_details.email!,
        pricePaid: (object.amount / 100).toFixed(2),
      },
    });

    return NextResponse.json({
      message: "Order updated was successful",
    });
  }
  return NextResponse.json({
    message: "Order update failed",
  });
}
