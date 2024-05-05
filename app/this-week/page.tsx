"use client";
import { useEffect, useState } from "react";
import { useGlobalState } from "../context/globalProvider";

// CalendarView component being defined
export default function CalendarView() {
  const { tasks } = useGlobalState(); // accessing tasks state from global context
  const [currentTime, setCurrentTime] = useState(new Date()); // current time state being initialised
// Effect hook which updates the current time
  useEffect(() => { 
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // this clears interval using cleanup function
  }, []);
// array for all the days of the week
  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  // calculating the start of that current week the user us in
  const startOfWeek = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate() - currentTime.getDay() + 1
  );
// function for filtering tasks based on the day, with the logic to filter the tasks
  const getTasksForDay = (day: any) => {
    const tasksForDay = tasks.filter((task: any) => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getDate() === day.getDate() &&
        taskDate.getMonth() === day.getMonth() &&
        taskDate.getFullYear() === day.getFullYear()
      );
    });

    const sorted = tasksForDay.sort((a: any, b: any) => {
      if (a.startTime < b.startTime) return -1;
    });

    return sorted;
  };
// function for generating column for a particular day with the logic for generating day column
  const getDayColumn = (dayOffset: any) => {
    const day = new Date(startOfWeek.getTime());
    day.setDate(day.getDate() + dayOffset);

    return (
      <div
        key={day.toDateString()}
        className="flex-1 min-w-[14%] border text-center"
      >
        <div className="font-bold py-1 bg-orange-400">
          {daysOfTheWeek[day.getDay()]}
        </div>
        {getTasksForDay(day).map((task: any) => (
          <div
            style={{
              height: task.duration + "px",
            }}
            key={task.id}
            className="m-1 rounded bg-[#E98074] p-1"
          >
            {task.title} - {task.workload} - {task.duration}
          </div>
        ))}
      </div>
    );
  };
// function to calculate the progress line position 
const getProgressLineStyle = () => { // function to calculate the position of the progress line
  const now = new Date(); // get the current date and time
  const startOfDay = new Date( // calculate the start of the current day
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const secondsElapsed = (now.getTime() - startOfDay.getTime()) / 1000; // calculate the elapsed seconds since the start of the day
  const totalSecondsInDay = 86400; // total seconds in a day (24 hours * 60 minutes * 60 seconds)
  const percentageOfDay = (secondsElapsed / totalSecondsInDay) * 100; // calculate the percentage of the day elapsed
  return percentageOfDay + "%"; // return the percentage as a string with '%' sign
};

return ( // return JSX for rendering the calendar view
  <>
    <div className="flex items-center mb-2 justify-between">
      <h1 className="text-2xl font-bold">This Week</h1> 
      <div>{startOfWeek.toDateString()}</div>
    </div>
    <div className="relative">
      <div className="flex justify-between"> 
        {Array.from({ length: 7 }).map((_, index) => getDayColumn(index))} 
      </div>
      <div // progress line element
        style={{
          top: getProgressLineStyle(), // position of the progress line
          position: "absolute", // absolute positioning
          width: "100%", // full width
          borderTop: "2px solid red", // red border for the progress line
          marginTop: "35px", // margin from the top
        }}
      ></div>
    </div>
  </>
);
}
