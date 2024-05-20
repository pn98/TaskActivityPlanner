import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js"; // Importing the PaymentElement component from Stripe
import { useRouter } from "next/navigation"; // Importing useRouter hook from Next.js for navigation

export default function CheckoutForm({
  clientSecret,
  onError,
  onPaymentSuccess,
}: {
  clientSecret: string;
  onError?: () => void;
  onPaymentSuccess?: () => void;
}) {
  const router = useRouter(); // Initializing the router for navigation
  const [isLoading, setIsLoading] = React.useState(false); // State to track loading status

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    setIsLoading(true); // Set loading state to true

    // Skipping actual Stripe payment processing and redirecting
    try {
      // Simulate payment processing delay
      setTimeout(() => {
        console.log("Payment processed successfully!");
        onPaymentSuccess && onPaymentSuccess(); // Call onPaymentSuccess callback if provided
        router.push("/share"); // Redirect to "/share" page
      }, 1000); // Adjust the delay as needed
    } catch (error) {
      console.error(error);
      onError && onError(); // Optionally, handle/display errors in UI
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  // Rendering the checkout form
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement /> {/* Stripe PaymentElement component */}
      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || !clientSecret} // Disable button if loading or clientSecret is missing
        style={{ color: "#D7CEC7" }} // Inline style for button color
      >
        {isLoading ? "Processing..." : "Pay"} {/* Show "Processing..." text when loading, otherwise show "Pay" */}
      </button>
    </form>
  );
}
