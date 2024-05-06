import React from "react"; // importing React
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"; // importing Stripe elements and hooks

// CheckoutForm component
export default function CheckoutForm({
  clientSecret,
  onError,
  onPaymentSuccess,
}: {
  clientSecret: string;
  onError?: () => void;
  onPaymentSuccess?: () => void;
}) {
  const stripe = useStripe(); // accessing Stripe instance
  const elements = useElements(); // accessing Stripe elements
  const [isLoading, setIsLoading] = React.useState(false); // state for loading status

  // function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // preventing default form submission behavior

    // check if Stripe and clientSecret are available
    if (!stripe || !elements || !clientSecret) {
      console.log(
        "Stripe.js has not fully loaded yet or clientSecret is missing."
      );
      return;
    }

    setIsLoading(true); // set loading status to true

    try {
      // confirm payment with Stripe
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/",
        },
        redirect: "if_required",
      });

      console.log(result);

      // handle payment result
      if (result.error) {
        console.log("[error]", result.error.message);
        onError && onError(); // call onError callback if provided
      } else {
        console.log("Payment processed successfully!");
        onPaymentSuccess && onPaymentSuccess(); // call onPaymentSuccess callback if provided
      }
    } catch (error) {
      console.error(error);
      // Optionally, handle/display errors in UI
    } finally {
      setIsLoading(false); // set loading status to false
    }
  };

  // rendering the checkout form
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement /> {/* Stripe PaymentElement component */}
      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements || !clientSecret}
      >
        Pay
      </button>
    </form>
  );
}
