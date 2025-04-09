"use client";
import { useEffect, useState } from "react";
import { useGlobalState } from "../context/globalProvider";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// CalendarView component being defined
export default function CalendarView() {
  const { tasks } = useGlobalState(); // Accessing tasks state from global context
  const [currentTime, setCurrentTime] = useState(new Date()); // Initializing current time state

  // Effect hook to update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update time every second for smoother progress bar updates
    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, []);

  // Array for all the days of the week, starting with Sunday
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Calculating the start of the current week based on the current time
  const startOfWeek = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate() - currentTime.getDay() + 1
  );

  // Function to filter tasks based on the day
  const getTasksForDay = (day: Date) => {
    const tasksForDay = tasks.filter((task: { date: string | number | Date; }) => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getDate() === day.getDate() &&
        taskDate.getMonth() === day.getMonth() &&
        taskDate.getFullYear() === day.getFullYear()
      );
    });

    // Sorting tasks based on start time
    const sorted = tasksForDay.sort((a: { startTime: number; }, b: { startTime: number; }) => {
      if (!a.startTime || !b.startTime) return 0; // Ensure startTime exists before comparing
      return a.startTime < b.startTime ? -1 : 1;
    });

    return sorted;
  };

  // Function to generate a column for a particular day
  const getDayColumn = (dayOffset: number) => {
    const day = new Date(startOfWeek.getTime());
    day.setDate(day.getDate() + dayOffset);

    return (
      <div
        key={day.toDateString()}
        className="flex-1 min-w-[14%] border text-center"
        style={{ borderColor: "white", display: "flex", flexDirection: "column", position: "relative" }}
      >
        {/* Day header */}
        <div className="font-bold py-1" style={{ backgroundColor: "#D7CEC7", color: "black", position: "sticky", top: 0, zIndex: 1 }}>
          {daysOfTheWeek[day.getDay()]}
        </div>
        {/* Task containers for the day */}
        <div className="day-column" style={{ flex: 1, position: "relative", paddingTop: "36px" }}>
          {getTasksForDay(day).map((task: any) => {
            if (!task.startTime || !task.completionTime) {
              // Skip tasks with invalid startTime or completionTime
              return null;
            }

            // Ensure startTime is valid before splitting
            const startTimeParts = task.startTime.split(":");
            if (startTimeParts.length !== 2) {
              return null;
            }

            // Calculating task box dimensions and position
            const durationInMinutes = parseInt(task.completionTime);
            const durationPercentage = (durationInMinutes / 1440) * 100; // Height in percentage based on 1440 minutes in a day
            const [startTimeHours, startTimeMinutes] = startTimeParts.map(Number);
            const startTimePercentage = ((startTimeHours * 60 + startTimeMinutes) / 1440) * 100; // Start time in percentage

            const minHeight = 20;
            const boxHeight = durationInMinutes > minHeight ? `${durationPercentage}%` : `${minHeight}px`; // Ensure a minimum height
            const fontSize = boxHeight === `${minHeight}px` ? "0.75rem" : "1rem"; // Adjust font size

            return (
              <div
                style={{
                  height: boxHeight,
                  backgroundColor: "#fff",
                  color: "#000",
                  position: "absolute",
                  top: `calc(${startTimePercentage}% - 0.25rem)`, // Adjust top position by -0.25rem
                  width: "90%",
                  left: "5%",
                  zIndex: 2, // Ensure task boxes are above grid lines
                  fontSize: fontSize,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2px"
                }}
                key={task.id}
                className="m-1 rounded"
                data-tooltip-id={`tooltip-${task.id}`} // Add tooltip ID
                data-tooltip-content={task.title} // Add tooltip content
              >
                {task.title}
                <Tooltip id={`tooltip-${task.id}`} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Function to calculate the progress line position
  const getProgressLineStyle = () => {
    const now = new Date(); // Get the current date and time
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ); // Calculate the start of the current day
    const secondsElapsed = (now.getTime() - startOfDay.getTime()) / 1000; // Calculate elapsed seconds since the start of the day
    const totalSecondsInDay = 86400; // Total seconds in a day (24 hours * 60 minutes * 60 seconds)
    const percentageOfDay = (secondsElapsed / totalSecondsInDay) * 100; // Calculate the percentage of the day elapsed
    return `calc(${percentageOfDay}% + 1.7rem)`; // Adjusted to account for header height and padding
  };

  // Function to generate hourly time blocks for the y-axis
  const getHourlyBlocks = () => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    return (
      <div className="flex flex-col h-full pt-9">
        {hours.map((hour) => (
          <div key={hour} className="flex-1 border-t text-center" style={{ color: "#D7CEC7", position: "relative", zIndex: 1 }}>
            {hour}
            {/* Horizontal line for each hour */}
            <div style={{ position: "absolute", top: 0, left: "64px", width: "calc(2140% - 64px)", borderTop: "1px solid #D7CEC7", zIndex: -1 }}></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Header section */}
      <div className="flex items-center mb-2 justify-between">
        <h1 className="text-2xl font-bold" style={{ color: "#D7CEC7" }}>This Week</h1>
        <div style={{ color: "#D7CEC7" }}>{startOfWeek.toDateString()}</div>
      </div>
      {/* Main content section */}
      <div className="relative" style={{ height: "calc(100vh - 100px)", display: "flex" }}>
        <div className="w-16">{getHourlyBlocks()}</div>
        <div className="flex justify-between flex-1" style={{ height: "100%", position: "relative" }}>
          {Array.from({ length: 7 }).map((_, index) => getDayColumn(index))}
        </div>
        {/* Progress line indicating the current time */}
        <div
          style={{
            top: getProgressLineStyle(), // Position of the progress line
            position: "absolute", // Absolute positioning
            width: "100%", // Full width
            borderTop: "2px solid red", // Red border for the progress line
            zIndex: 2,
          }}
        ></div>
      </div>
    </>
  );
}
