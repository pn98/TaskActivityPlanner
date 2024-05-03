"use client";

import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { useGlobalState } from "../context/globalProvider";
import "react-calendar-heatmap/dist/styles.css";
import "./index.css";

// defining page component 
export default function Page() {
  const { tasks } = useGlobalState(); //tasks state being accessed from globalContext

  // processing for basic task counts
  const taskCountsByDate = tasks.reduce((acc: any, task: any) => { //calculating task count
    const date = task.date.split("T")[0]; // extracting the date from task date
    if (!acc[date]) { //checking if the date exists in accumulator
      acc[date] = 0; //iniatlize count to 0 if the date does not exist
    }
    acc[date] += 1; // increment count for date
    return acc; // returns the updated accumulator
  }, {});

  // converting to array for the heatmap
  const heatmapValues = Object.keys(taskCountsByDate).map((date) => ({
    date,
    count: taskCountsByDate[date], // this sets the count as task count for the date
  }));

  // processing for priority heatmap
  const priorityCountsByDate = tasks.reduce((acc: any, task: any) => { // calculation for priority count
    const date = task.date.split("T")[0]; // date being extracted from the class
    const priority = task.priority; // priority being extracted from the class
    if (!acc[date]) { // check if this date actually exists within the accumulator
      acc[date] = { high: 0, medium: 0, low: 0 }; // priority count being initialized  to 0, if the date does not exist
    }
    if (priority === "High") acc[date].high += 1; // high priority count incremented if the priority is set to High by the user
    if (priority === "Medium") acc[date].medium += 1; // medium priority count incremented if the priority is set to medium by the user
    if (priority === "Low") acc[date].low += 1; // low priority count incremented if the priority is set to low by the suer
    return acc;
  }, {});
  
  const priorityHeatmapValues = Object.keys(priorityCountsByDate).map( // converting priority counts to heatmap values
    (date) => {
      const { high, medium, low } = priorityCountsByDate[date]; // destructuring priority counts
      const score = high * 2 + medium; // calculating priority score
      return { date, count: score }; // returning date and priority score
    }
  );

  // processing for mood heatmap
  const moodScoresByDate = tasks.reduce((acc: any, task: any) => { // mood score calculation
    const date = task.date.split("T")[0]; // extracting date from task date
    const moodScore: { [key: string]: number } = { // mapping mood to score
      Excited: 3,
      Happy: 2,
      Focused: 1,
      Bored: -1,
      Sad: -2,
    };
    acc[date] = acc[date] || []; // initializing mood scores array if date doesn't exist
    acc[date].push(moodScore[task.mood] || 0); // pushing mood score to array for the date
    return acc; // return updated accumulator
  }, {});

  const moodHeatmapValues = Object.keys(moodScoresByDate).map((date) => { // converting mood scores to heatmap values
    const scores = moodScoresByDate[date]; // getting mood scores for the date
    const average = scores.reduce((a: any, b: any) => a + b, 0) / scores.length; // calculating average mood score
    return { date, count: average }; // returning date and average mood score
  });

  const classForPriorityValue = (value: any) => { // function to determine CSS class based on priority value
    if (!value) return "color-empty"; // return empty color if value doesn't exist
    const count = value.count; // get count from value
    if (count >= 3) return "color-red"; // return red color for count >= 3
    if (count === 2) return "color-orange"; // return orange color for count === 2
    if (count === 1) return "color-yellow"; // return yellow color for count === 1
    return "color-green"; // return green color for count === 0
  };

  const classForMoodValue = (value: any) => { // function to determine CSS class based on mood value
    if (!value) return "color-empty"; // return empty color if value doesn't exist
    const average = value.count; // get average mood score from value
    if (average > 2.5) return "color-green"; // return green color for average mood score > 2.5
    if (average > 1.5) return "color-orange"; // return orange color for average mood score > 1.5
    if (average > 0.5) return "color-yellow"; // return yellow color for average mood score > 0.5
    return "color-red"; // return red color for average mood score <= 0.5
  };

  return ( // JSX for rendering the page
    <div className="h-full w-full flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Task Heatmap</h1>
        <p className="text-gray-500">Number of tasks completed each day</p>
      </div>

      <h1>General Heatmap</h1>
      <CalendarHeatmap // CalendarHeatmap component for general heatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={heatmapValues}
        showWeekdayLabels={true}
        classForValue={(value) => { // function to determine CSS class for each value
          if (!value) {
            return "color-empty";
          }
          const count = value.count; // get count from value
          if (count === 0) {
            return "color-green"; // green color for no tasks
          } else if (count <= 2) {
            return "color-yellow"; // yellow color for 1-2 tasks
          } else if (count <= 4) {
            return "color-orange"; // orange color for 3-4 tasks
          } else {
            return "color-red"; // red color for 5 or more tasks
          }
        }}
        titleForValue={(value) => { // function to display title for each value
          if (!value) {
            return "No tasks";
          }
          return `${value.count} tasks`; // displaying task count
        }}
      />

      <h1>Prioirity Heatmap</h1>
      <CalendarHeatmap // CalendarHeatmap component for priority heatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={priorityHeatmapValues}
        showWeekdayLabels={true}
        weekdayLabels={["S", "M", "T", "W", "T", "F", "S"]}
        classForValue={classForPriorityValue} // using function to determine CSS class for each value
        titleForValue={(value) => { // function to display title for each value
          if (!value) {
            return "No tasks";
          }
          return `${value.count} tasks`; // displaying task count
        }}
      />

      <h1>Mood Heatmap</h1>
      <CalendarHeatmap // CalendarHeatmap component for mood heatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={moodHeatmapValues}
        showWeekdayLabels={true}
        classForValue={classForMoodValue} // using function to determine CSS class for each value
        titleForValue={(value) => { // function to display title for each value
          if (!value) {
            return "No tasks";
          }
          return `${value.count} tasks`; // displaying task count
        }}
      />
    </div>
  );
}
