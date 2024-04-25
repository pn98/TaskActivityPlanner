"use client";
import React from "react";
import { useGlobalState } from "../Context/globalProvider";
import TaskItem from "../Components/TaskItem/TaskItem";

function page() {
  const { importantTasks } = useGlobalState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {importantTasks.map((task: any) => (
        <TaskItem key={task._id} {...task} />
      ))}
    </div>
  );
}

export default page;
