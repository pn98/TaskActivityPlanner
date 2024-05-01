"use client";

import React from "react";
import { useGlobalState } from "../context/globalProvider";
import TaskItem from "../Components/TaskItem/TaskItem";

function Page() {
  const { incompleteTasks, tasks } = useGlobalState();

  React.useEffect(() => {
    // Check if there are any tasks with isCompleted === false
    const incompleteTaskExists = tasks.some(
      (task: { isCompleted: any }) => !task.isCompleted
    );

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
      <table>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Title
            </th>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Description
            </th>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Date
            </th>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Workload
            </th>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Priority
            </th>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Completion Time
            </th>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Mood
            </th>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Mood After
            </th>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Status
            </th>
            <th
              style={{
                textAlign: "left",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        {incompleteTasks.map((task: any) => (
          <TaskItem key={task._id} {...task} />
        ))}
      </table>
    </div>
  );
}

export default Page;
