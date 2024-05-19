"use client";

import React, { useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { useGlobalState } from "../context/globalProvider";
import "react-calendar-heatmap/dist/styles.css";
import "./index.css";

export default function Page() {
  const { tasks } = useGlobalState();

  useEffect(() => {
    const cells = document.querySelectorAll(".react-calendar-heatmap .day");

    cells.forEach(cell => {
      cell.addEventListener("mouseenter", (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        const tooltip = document.createElement("div");
        tooltip.className = "heatmap-tooltip";
        tooltip.innerText = e.target.getAttribute("data-date") || "";
        document.body.appendChild(tooltip);

        const moveTooltip = (e: MouseEvent) => {
          tooltip.style.left = `${e.pageX + 10}px`;
          tooltip.style.top = `${e.pageY + 10}px`;
        };

        document.addEventListener("mousemove", moveTooltip);

        cell.addEventListener("mouseleave", () => {
          document.body.removeChild(tooltip);
          document.removeEventListener("mousemove", moveTooltip);
        }, { once: true });
      });
    });
  }, [tasks]);

  const taskCountsByDate = tasks.reduce((acc: any, task: any) => {
    const date = task.date.split("T")[0]; // assuming task.date is in ISO format e.g., 2024-01-01T00:00:00Z
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  const priorityCountsByDate = tasks.reduce((acc: any, task: any) => {
    const date = task.date.split("T")[0];
    const priority = task.priority;
    if (!acc[date]) {
      acc[date] = { high: 0, medium: 0, low: 0 };
    }
    if (priority === "High") acc[date].high += 1;
    if (priority === "Medium") acc[date].medium += 1;
    if (priority === "Low") acc[date].low += 1;
    return acc;
  }, {});

  const moodScoresByDate = tasks.reduce((acc: any, task: any) => {
    const date = task.date.split("T")[0];
    const moodScore: { [key: string]: number } = {
      Excited: 3,
      Happy: 2,
      Focused: 1,
      Bored: -1,
      Sad: -2,
    };
    acc[date] = acc[date] || [];
    acc[date].push(moodScore[task.mood] || 0);
    return acc;
  }, {});

  const allDates = (taskCounts: any) => {
    const dates = [];
    const currentDate = new Date("2024-01-01");
    const endDate = new Date("2024-12-31");

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      dates.push({
        date: dateStr,
        count: taskCounts[dateStr] || 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const heatmapValues = allDates(taskCountsByDate);

  const priorityHeatmapValues = allDates(Object.keys(priorityCountsByDate).reduce((acc: any, date) => {
    const { high, medium, low } = priorityCountsByDate[date];
    const score = high * 2 + medium; // 2 points for High, 1 for Medium, 0 for Low
    acc[date] = score;
    return acc;
  }, {}));

  const moodHeatmapValues = allDates(Object.keys(moodScoresByDate).reduce((acc: any, date) => {
    const scores = moodScoresByDate[date];
    const average = scores.reduce((a: any, b: any) => a + b, 0) / scores.length;
    acc[date] = average;
    return acc;
  }, {}));

  const classForPriorityValue = (value: any) => {
    if (!value) return "color-empty";
    const count = value.count;
    if (count >= 3) return "color-red";
    if (count === 2) return "color-orange";
    if (count === 1) return "color-yellow";
    return "color-green";
  };

  const classForMoodValue = (value: any) => {
    if (!value) return "color-green"; // Default to green
    const average = value.count;
    if (average > 2.5) return "color-green";
    if (average > 1.5) return "color-orange";
    if (average > 0.5) return "color-yellow";
    return "color-green";
  };

  const tooltipDataAttrs = (value: any) => {
    return {
      'data-date': value ? value.date : '',
    };
  };

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold task-heatmaps-header">Task Heatmaps</h1>
        <p className="text-gray-500 task-heatmaps-description">
          Annual Representation for Number of Tasks, Priority of Tasks and Mood Perception on Tasks
        </p>
      </div>

      <h1 className="section-header">General Heatmap</h1>
      <CalendarHeatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={heatmapValues}
        showWeekdayLabels={true}
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
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
        tooltipDataAttrs={tooltipDataAttrs}
        titleForValue={(value) => {
          return value ? value.date : '';
        }}
      />

      <h1 className="section-header">Priority Heatmap</h1>
      <CalendarHeatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={priorityHeatmapValues}
        showWeekdayLabels={true}
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        classForValue={classForPriorityValue}
        tooltipDataAttrs={tooltipDataAttrs}
        titleForValue={(value) => {
          return value ? value.date : '';
        }}
      />

      <h1 className="section-header">Mood Heatmap</h1>
      <CalendarHeatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={moodHeatmapValues}
        showWeekdayLabels={true}
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        classForValue={classForMoodValue}
        tooltipDataAttrs={tooltipDataAttrs}
        titleForValue={(value) => {
          return value ? value.date : '';
        }}
      />
    </div>
  );
}
