import { NextResponse } from "next/server";
// Importing the NextResponse class from the "next/server" module.

import prisma from "@/app/Utils/connect";
// Importing the Prisma client instance from a custom module "@/app/utils/connect".

import { auth } from "@clerk/nextjs";
// Importing the auth function from the "@clerk/nextjs" module, which might handle authentication.

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    // Retrieving the userId using the auth function, possibly related to authentication.

    const { id } = params;
    // Extracting the id from the params object.

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
      // Returning a new NextResponse with a 401 status if userId is falsy.
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    // Deleting a task using Prisma.

    return new NextResponse(JSON.stringify(task), { status: 200 });
    // Returning a new NextResponse with the deleted task and a 200 status.
  } catch (error) {
    console.error("ERROR DELETING TASK: ", error);
    // Logging an error if an exception occurs during task deletion.

    return new NextResponse(JSON.stringify({ error: "Error deleting task" }), { status: 500 });
    // Returning a new NextResponse with an error message and a 500 status if there's an error.
  }
}
