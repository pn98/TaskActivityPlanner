import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});
// POST request handler function
export async function POST(req: Request) {
  try {
    const { amount } = await req.json(); // extracting amount from the request body
    if (!Number.isInteger(amount)) {
      return NextResponse.json({ error: "Invalid amount format" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // specifying payment amount
      currency: "gbp", // specifying currency as GDP
      automatic_payment_methods: {
        enabled: true,
      },
    });
  // returning response with client secret for the payment intent    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 });
  }
}
