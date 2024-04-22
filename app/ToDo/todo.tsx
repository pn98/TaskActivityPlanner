"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import TaskItem from "../Components/TaskItem/TaskItem";

function page() {
  const { incompleteTasks } = useGlobalState();

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
}

export default page;
