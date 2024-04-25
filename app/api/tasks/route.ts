import prisma from "@/app/utils/connect";
// Importing the Prisma client instance from a custom module "@/app/utils/connect".

import { auth } from "@clerk/nextjs";
// Importing the auth function from the "@clerk/nextjs" module, possibly for authentication.

import { NextResponse } from "next/server";
// Importing the NextResponse class from the "next/server" module.

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    // Retrieving the userId using the auth function, possibly for authentication.

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
      // Returning a NextResponse with a 401 status if userId is falsy.
    }

    const { title, description, date, completed, important } = await req.json();
    // Extracting task details from the request body.

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
      // Returning a NextResponse with a 400 status if required fields are missing.
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
      // Returning a NextResponse with a 400 status if the title is too short.
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    // Creating a new task using Prisma.

    return NextResponse.json(task);
    // Returning a NextResponse with the created task.
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    // Logging an error if an exception occurs during task creation.

    return NextResponse.json({ error: "Error creating task", status: 500 });
    // Returning a NextResponse with an error message and a 500 status if there's an error.
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    // Retrieving the userId using the auth function, possibly for authentication.

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
      // Returning a NextResponse with a 401 status if userId is falsy.
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });
    // Retrieving tasks associated with the userId using Prisma.

    return NextResponse.json(tasks);
    // Returning a NextResponse with the retrieved tasks.
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    // Logging an error if an exception occurs during task retrieval.

    return NextResponse.json({ error: "Error updating task", status: 500 });
    // Returning a NextResponse with an error message and a 500 status if there's an error.
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    // Retrieving the userId using the auth function, possibly for authentication.

    const { isCompleted, id } = await req.json();
    // Extracting task details from the request body.

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
      // Returning a NextResponse with a 401 status if userId is falsy.
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });
    // Updating a task's completion status using Prisma.

    return NextResponse.json(task);
    // Returning a NextResponse with the updated task.
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    // Logging an error if an exception occurs during task update.

    return NextResponse.json({ error: "Error deleting task", status: 500 });
    // Returning a NextResponse with an error message and a 500 status if there's an error.
  }
}
