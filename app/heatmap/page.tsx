"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import { useGlobalState } from "../context/globalProvider";
import "react-calendar-heatmap/dist/styles.css";
import "./index.css";

export default function page() {
  const { tasks } = useGlobalState();

  const taskCountsByDate = tasks.reduce((acc: any, task: any) => {
    const date = task.date.split("T")[0];
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  // Convert to array for the heatmap
  const heatmapValues = Object.keys(taskCountsByDate).map((date) => ({
    date,
    count: taskCountsByDate[date],
  }));

  return (
    <div className="h-full w-full flex flex-col justify-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Task Heatmap</h1>
        <p className="text-gray-500">Number of tasks completed each day</p>

        <ul>
          <li>
            <span className="text-green-600">◼</span> 0 tasks
          </li>
          <li>
            <span className="text-yellow-500">◼</span> 1-2 tasks
          </li>
          <li>
            <span className="text-orange-500">◼</span> 3-4 tasks
          </li>
          <li>
            <span className="text-red-500">◼</span> 5+ tasks
          </li>
        </ul>
      </div>
      <CalendarHeatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={heatmapValues}
        showWeekdayLabels={true}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          const count = value.count;
          if (count === 0) {
            return "color-green";
          } else if (count <= 2) {
            return "color-yellow";
          } else if (count <= 4) {
            return "color-orange";
          } else {
            return "color-red";
          }
        }}
      />
    </div>
  );
}
