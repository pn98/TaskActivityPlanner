"use client";

import React, { useEffect } from "react";
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
        {completedTasks.map((task: any) => (
          <TaskItem key={task._id} {...task} />
        ))}
      </table>
    </div>
  );
}

export default page;
