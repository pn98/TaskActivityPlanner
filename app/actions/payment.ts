"use server";
import prisma from "@/app/utils/connect"; // importing Prisma client
import { auth } from "@clerk/nextjs"; // importing authentication middleware

// function to retrieve payment details
export async function getPayment() {
  try {
    const { userId } = auth(); // extracting user ID from authentication token

    if (!userId) {
      return { error: "unauthorized", status: 401 }; // return unauthorized error if user ID is missing
    }

    // querying payment details for the user
    const payment = await prisma.payment.findFirst({
      where: {
        userId: userId,
      },
    });

    return { payment }; // returning payment details
  } catch (error) {
    console.log("error getting payment: ", error); // logging error if encountered while fetching payment
    return { error: "error getting payment", status: 500 }; // returning error response
  }
}

// function to create a new payment
export async function createPayment() {
  try {
    const { userId } = auth(); // extracting user ID from authentication token

    if (!userId) {
      return { error: "unauthorized", status: 401 }; // return unauthorized error if user ID is missing
    }

    // creating a new payment record for the user
    const payment = await prisma.payment.create({
      data: {
        paymentDone: true,
        userId,
      },
    });

    return { payment }; // returning newly created payment details
  } catch (error) {
    console.log("error creating payment: ", error); // logging error if encountered while creating payment
    return { error: "error creating payment", status: 500 }; // returning error response
  }
}
