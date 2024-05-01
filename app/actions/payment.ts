"use server";
import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";

export async function getPayment() {
  try {
    const { userId } = auth();

    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    const payment = await prisma.payment.findFirst({
      where: {
        userId: userId,
      },
    });

    return { payment };
  } catch (error) {
    console.log("ERROR GETTING PAYMENT: ", error);
    return { error: "Error getting payment", status: 500 };
  }
}

export async function createPayment() {
  try {
    const { userId } = auth();

    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    const payment = await prisma.payment.create({
      data: {
        paymentDone: true,
        userId,
      },
    });

    return { payment };
  } catch (error) {
    console.log("ERROR CREATING PAYMENT: ", error);
    return { error: "Error creating payment", status: 500 };
  }
}
