"use client";

import React from "react";
import { useGlobalState } from "../context/globalProvider";
import TaskItem from "../Components/TaskItem/TaskItem";

function Page() {
  const { incompleteTasks, tasks } = useGlobalState();
  const [filteredTasks, setFilteredTasks] = React.useState(tasks);

  React.useEffect(() => {
    // Sorting by priority High, Medium, Low
    const sortedTasks = tasks.sort((a: any, b: any) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority === "Medium" && b.priority === "Low") return -1;
      return 1;
    });

    setFilteredTasks(sortedTasks);
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
              Duration
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
              Actual Workload
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
              Actual Duration
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
