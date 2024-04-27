import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error("ERROR DELETING TASK: ", error);
    return new NextResponse(JSON.stringify({ error: "Error deleting task" }), { status: 500 });
  }
}
