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

  const heatmapValues = Object.keys(taskCountsByDate).map((date) => ({
    date,
    count: taskCountsByDate[date],
  }));

  return (
    <div>
      <CalendarHeatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={heatmapValues}
        showWeekdayLabels={true}
        classForValue={(value: { count: any; }) => {
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
