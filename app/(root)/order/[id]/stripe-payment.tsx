import React, { FormEvent, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { SERVER_URL } from "@/lib/constants";
const StripePayment = ({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
}) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const { theme, systemTheme } = useTheme();

  const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isloading, setIsloading] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements || email == null) {
        return;
      }
      setIsloading(true);

      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${SERVER_URL}/order/${orderId}/stripe-payment-success`,
          },
        })
        .then(({ error }) => {
          if (
            error.type === "card_error" ||
            error.type === "validation_error"
          ) {
            setErrorMessage(error?.message ?? "An error occurred");
          } else if (error) {
            setErrorMessage("An error occurred");
          }
        })
        .finally(() => {
          setIsloading(false);
        });
    };
    return (
      <>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-xl">Stripe checkout</div>
          {errorMessage && (
            <div className="text-destructive">{errorMessage}</div>
          )}
          <PaymentElement />
          <div>
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
          <Button
            className="w-full"
            size={"lg"}
            disabled={stripe === null || elements === null || isloading}
          >
            {isloading
              ? "Loading..."
              : `Pay ${formatCurrency(priceInCents / 100)}`}
          </Button>
        </form>
      </>
    );
  };
  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: theme === "dark" ? "night" : "stripe",
        },
      }}
      stripe={stripePromise}
    >
      <StripeForm />
    </Elements>
  );
};

export default StripePayment;
