import React from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({
  clientSecret,
  onError,
  onPaymentSuccess,
}: {
  clientSecret: string;
  onError?: () => void;
  onPaymentSuccess?: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.log(
        "Stripe.js has not fully loaded yet or clientSecret is missing."
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/",
        },

        redirect: "if_required",
      });

      console.log(result);

      if (result.error) {
        console.log("[error]", result.error.message);
        onError && onError();
      } else {
        console.log("Payment processed successfully!");
        onPaymentSuccess && onPaymentSuccess();
      }
    } catch (error) {
      console.error(error);
      // Optionally, handle/display errors in UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements || !clientSecret}
      >
        Pay
      </button>
    </form>
  );
}
