"use client";

import React from "react";
import { useGlobalState } from "../Context/globalProvider";
import TaskItem from "../Components/TaskItem/TaskItem";

function Page() {
  const { incompleteTasks, tasks } = useGlobalState();

  React.useEffect(() => {
    // Check if there are any tasks with isCompleted === false
    const incompleteTaskExists = tasks.some((task: { isCompleted: any; }) => !task.isCompleted);

    // If there are incomplete tasks, redirect to the incompleteTasks section
    if (incompleteTaskExists) {
      window.location.href = "#incomplete-tasks";
    }
  }, [tasks]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {incompleteTasks.map((task: any) => (
        <TaskItem key={task._id} {...task} />
      ))}
    </div>
  );
}

export default Page;
