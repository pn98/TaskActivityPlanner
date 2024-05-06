import { NextResponse } from "next/server"; // importing Next.js server response utility
import prisma from "@/app/utils/connect"; // importing Prisma client
import { auth } from "@clerk/nextjs"; // importing authentication middleware

// DELETE request handler function
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth(); // extracting user ID from authentication token
    const { id } = params; // extracting task ID from request parameters

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 }); // return unauthorized response if user ID is missing
    }

    // deleting task from the database
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    // returning success response with deleted task details
    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error("error deleting task: ", error); // logging error if encountered while deleting task
    return new NextResponse(JSON.stringify({ error: "error deleting task" }), { status: 500 }); // returning error response
  }
}
