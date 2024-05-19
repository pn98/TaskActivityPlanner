"use client";

import React, { useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { useGlobalState } from "../context/globalProvider";
import "react-calendar-heatmap/dist/styles.css";
import "./index.css";

// defining page component
export default function Page() {
  const { tasks } = useGlobalState(); //tasks state being accessed from globalContext

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

  // processing for basic task counts
  const taskCountsByDate = tasks.reduce((acc: any, task: any) => { //calculating task count
    const date = task.date.split("T")[0]; // assuming task.date is in ISO format e.g., 2024-01-01T00:00:00Z
    if (!acc[date]) { //checking if the date exists in accumulator
      acc[date] = 0; //iniatlize count to 0 if the date does not exist
    }
    acc[date] += 1; // increment count for date
    return acc; // returns the updated accumulator
  }, {});

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
    return acc; // returns the updated accumulator
  }, {});

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

  const allDates = (taskCounts: any) => { // function to get all dates in the year
    const dates = []; // array to store dates
    const currentDate = new Date("2024-01-01"); // start date
    const endDate = new Date("2024-12-31"); // end date

    while (currentDate <= endDate) { // loop through all dates in the year
      const dateStr = currentDate.toISOString().split("T")[0]; // get date string in ISO format
      dates.push({ // push date and count to array
        date: dateStr,
        count: taskCounts[dateStr] || 0 // get count for date or 0 if no tasks
      });
      currentDate.setDate(currentDate.getDate() + 1); // increment date by 1 day
    }

    return dates; // return array of dates and counts
  };

  // converting to array for the heatmap
  const heatmapValues = allDates(taskCountsByDate); // converting task counts to heatmap values

  const priorityHeatmapValues = allDates(Object.keys(priorityCountsByDate).reduce((acc: any, date) => { // converting priority counts to heatmap values
    const { high, medium, low } = priorityCountsByDate[date]; // destructuring priority counts
    const score = high * 2 + medium; // calculating priority score
    acc[date] = score; // setting priority score for date
    return acc; // returns the updated accumulator
  }, {}));

  const moodHeatmapValues = allDates(Object.keys(moodScoresByDate).reduce((acc: any, date) => { // converting mood scores to heatmap values
    const scores = moodScoresByDate[date]; // getting mood scores for the date
    const average = scores.reduce((a: any, b: any) => a + b, 0) / scores.length; // calculating average mood score
    acc[date] = average; // setting average mood score for date
    return acc; // returns the updated accumulator
  }, {}));

  const classForPriorityValue = (value: any) => { // function to determine CSS class based on priority value
    if (!value) return "color-empty"; // return empty color if value doesn't exist
    const count = value.count; // get count from value
    if (count >= 3) return "color-red"; // return red color for count >= 3
    if (count === 2) return "color-orange"; // return orange color for count === 2
    if (count === 1) return "color-yellow"; // return yellow color for count === 1
    return "color-green"; // return green color for count === 0
  };

  const classForMoodValue = (value: any) => { // function to determine CSS class based on mood value
    if (!value) return "color-green"; // Default to green
    const average = value.count; // get average mood score from value
    if (average > 2.5) return "color-green"; // return green color for average mood score > 2.5
    if (average > 1.5) return "color-orange"; // return orange color for average mood score > 1.5
    if (average > 0.5) return "color-yellow"; // return yellow color for average mood score > 0.5
    return "color-green"; // return green color for average mood score <= 0.5
  };

  const tooltipDataAttrs = (value: any) => { // function to set tooltip data attributes
    return {
      'data-date': value ? value.date : '', // set data-date attribute to date or empty string
    };
  };

  return ( // JSX for rendering the page
    <div className="h-full w-full flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold task-heatmaps-header">Task Heatmaps</h1>
        <p className="text-gray-500 task-heatmaps-description">
          Annual Representation for Number of Tasks, Priority of Tasks and Mood Perception on Tasks
        </p>
      </div>

      <h1 className="section-header">General Heatmap</h1>
      <CalendarHeatmap // CalendarHeatmap component for general heatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={heatmapValues} // setting values for heatmap
        showWeekdayLabels={true} // show weekday labels
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} // setting weekday labels
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
        tooltipDataAttrs={tooltipDataAttrs} // setting tooltip data attributes
        titleForValue={(value) => { // function to display title for each value
          return value ? value.date : ''; // displaying date
        }}
      />

      <h1 className="section-header">Priority Heatmap</h1>
      <CalendarHeatmap // CalendarHeatmap component for priority heatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={priorityHeatmapValues} // setting values for heatmap
        showWeekdayLabels={true} // show weekday labels
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} // setting weekday labels
        classForValue={classForPriorityValue} // using function to determine CSS class for each value
        tooltipDataAttrs={tooltipDataAttrs} // setting tooltip data attributes
        titleForValue={(value) => { // function to display title for each value
          return value ? value.date : ''; // displaying date
        }}
      />

      <h1 className="section-header">Mood Heatmap</h1>
      <CalendarHeatmap // CalendarHeatmap component for mood heatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={moodHeatmapValues} // setting values for heatmap
        showWeekdayLabels={true} // show weekday labels
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} // setting weekday labels
        classForValue={classForMoodValue} // using function to determine CSS class for each value
        tooltipDataAttrs={tooltipDataAttrs} // setting tooltip data attributes
        titleForValue={(value) => { // function to display title for each value
          return value ? value.date : ''; // displaying date
        }}
      />
    </div>
  );
}
