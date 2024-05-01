"use client";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../checkout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Payment({
  onPaymentSuccess,
}: {
  onPaymentSuccess?: () => void;
}) {
  const [clientSecret, setClientSecret] = useState("");

  const fetchData = async () => {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 50 }),
    });
    const data = await response.json();
    setClientSecret(data.clientSecret);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onError = () => {
    setClientSecret("");
    console.log("Payment failed");
  };

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        onPaymentSuccess={onPaymentSuccess}
        clientSecret={clientSecret}
        onError={onError}
      />
    </Elements>
  );
}
