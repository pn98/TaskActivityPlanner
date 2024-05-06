"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import TaskItem from "../Components/TaskItem/taskItem";

// define the page component
function page() {
  const { importantTasks } = useGlobalState(); // get important tasks from global state

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {importantTasks.map((task: any) => (
        <TaskItem key={task._id} {...task} /> // render TaskItem component for each important task
      ))}
    </div>
  );
}

export default page;
