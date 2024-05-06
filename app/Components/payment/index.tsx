"use client";
import { useEffect, useState } from "react"; // importing useEffect and useState hooks from React
import { Elements } from "@stripe/react-stripe-js"; // importing Elements component from @stripe/react-stripe-js
import { loadStripe } from "@stripe/stripe-js"; // importing loadStripe function from @stripe/stripe-js
import CheckoutForm from "../checkout"; // importing CheckoutForm component

// Promise to load Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! // loading Stripe publishable key from environment variables
);

// Payment component
export default function Payment({
  onPaymentSuccess, // function to be called on payment success
}: {
  onPaymentSuccess?: () => void; // optional function prop for payment success
}) {
  const [clientSecret, setClientSecret] = useState(""); // state variable for client secret

  // function to fetch data from server and set client secret
  const fetchData = async () => {
    const response = await fetch("/api/create-payment-intent", { // sending POST request to server
      method: "POST",
      headers: {
        "Content-Type": "application/json", // setting content type
      },
      body: JSON.stringify({ amount: 50 }), // sending amount in request body
    });
    const data = await response.json(); // parsing response
    setClientSecret(data.clientSecret); // setting client secret received from server
  };

  useEffect(() => {
    fetchData(); // calling fetchData function on component mount
  }, []);

  // function to handle payment error
  const onError = () => {
    setClientSecret(""); // resetting client secret
    console.log("Payment failed"); // logging payment failure
  };

  // if client secret is not available yet, render loading message
  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  // rendering Elements component with CheckoutForm
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        onPaymentSuccess={onPaymentSuccess} // passing onPaymentSuccess function as prop
        clientSecret={clientSecret} // passing clientSecret as prop
        onError={onError} // passing onError function as prop
      />
    </Elements>
  );
}
