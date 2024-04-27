"use client";

import React from "react";
import { useGlobalState } from "../context/globalProvider";
import TaskItem from "../Components/TaskItem/TaskItem";

function page() {
  const { completedTasks } = useGlobalState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {completedTasks.map((task: any) => (
        <TaskItem key={task._id} {...task} />
      ))}
    </div>
  );
}

export default page;
