"use client";
import { useEffect, useState } from "react"; // Importing necessary hooks from React
import { Elements } from "@stripe/react-stripe-js"; // Importing Elements component from Stripe
import { loadStripe } from "@stripe/stripe-js"; // Importing loadStripe function to load Stripe
import { PaymentElement } from "@stripe/react-stripe-js"; // Importing PaymentElement component from Stripe
import { useRouter } from "next/navigation"; // Importing useRouter hook from Next.js for navigation

// Loading Stripe with the publishable key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Payment({
  onPaymentSuccess,
}: {
  onPaymentSuccess?: () => void;
}) {
  const [clientSecret, setClientSecret] = useState(""); // State to store the client secret from Stripe
  const router = useRouter(); // Initializing the router for navigation

  // Function to fetch the client secret from the server
  const fetchData = async () => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 50 }), // Sending the amount to be charged
      });

      const data = await response.json();
      setClientSecret(data.clientSecret); // Setting the client secret state
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  // useEffect to call fetchData once when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Display loading message while the client secret is being fetched
  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  // Custom appearance settings for Stripe elements
  const appearance = {
    theme: 'stripe',
    variables: {
      colorText: '#000000', // Black text in the fields
      colorTextSecondary: '#D7CEC7', // Header text color
      colorTextPlaceholder: '#D7CEC7', // Placeholder text color
      colorTextError: '#ff0000', // Error text color
    },
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Simulating payment processing delay and redirecting
    setTimeout(() => {
      console.log("Payment processed successfully!");
      onPaymentSuccess && onPaymentSuccess(); // Call onPaymentSuccess callback if provided
      router.push("/share"); // Redirect to "/share" page
    }, 1000); // Simulate delay and redirect
  };

  return (
    // Wrapping the form with Elements component to provide Stripe context
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <form onSubmit={handleSubmit}>
        <PaymentElement /> {/* Stripe PaymentElement component */}
        {/* Submit button */}
        <button
          type="submit"
          disabled={!clientSecret} // Disable button if client secret is not available
          style={{ color: "#D7CEC7" }} // Inline style for button color
        >
          Pay
        </button>
      </form>
    </Elements>
  );
}
