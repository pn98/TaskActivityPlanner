import prisma from "@/app/utils/connect"; // importing Prisma client
import { auth } from "@clerk/nextjs"; // importing authentication middleware
import { NextResponse } from "next/server"; // importing Next.js server response utility

// POST request handler function
export async function POST(req: Request) {
  try {
    const { userId } = auth(); // extracting user ID from authentication token

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 }); // return unauthorized response if user ID is missing
    }

    const {
      title,
      description,
      date,
      completed,
      priority,
      mood,
      workload,
      timeToComplete,
      share,
      message,
      moodAfter,
      startTime,
      duration,
    } = await req.json();

    // checking for missing required fields
    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    // checking title length
    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    // creating a new task in the database
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        completionTime: timeToComplete,
        priority,
        mood,
        workload,
        userId,
        share,
        message,
        startTime,
        moodAfter,
        duration,
      },
    });

    return NextResponse.json(task); // returning newly created task
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error); // logging error if encountered while creating task
    return NextResponse.json({ error: "Error creating task", status: 500 }); // returning error response
  }
}

// GET request handler function
export async function GET(req: Request) {
  try {
    const { userId } = auth(); // extracting user ID from authentication token

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 }); // return unauthorized response if user ID is missing
    }

    // fetching tasks associated with the user from the database
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks); // returning tasks
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error); // logging error if encountered while fetching tasks
    return NextResponse.json({ error: "Error updating task", status: 500 }); // returning error response
  }
}

// PUT request handler function
export async function PUT(req: Request) {
  try {
    const { userId } = auth(); // extracting user ID from authentication token
    const {
      isCompleted,
      id,
      moodAfter,
      completionTime,
      actualWorkload,
      actualDuration,
    } = await req.json();

    console.log(
      "PUT request",
      isCompleted,
      id,
      moodAfter,
      actualWorkload,
      actualDuration
    );

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 }); // return unauthorized response if user ID is missing
    }

    // updating task details in the database
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
        moodAfter,
        actualDuration,
        actualWorkload,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
