import { NextRequest, NextResponse } from "next/server"; // importing Next.js server request and response utilities
import Stripe from "stripe"; // importing Stripe library
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // creating a new instance of Stripe

// POST request handler function
export async function POST(req: NextRequest) {
  const body = await req.json(); // extracting JSON body from the request
  const { amount } = body; // extracting amount from the request body
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // specifying payment amount
    currency: "GDP", // specifying currency as GDP
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // returning response with client secret for the payment intent
  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
