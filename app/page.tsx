"use client";
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";
import { useEffect, useState } from "react";

export default function Home() {
  const { tasks } = useGlobalState();
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const filtered = tasks.filter((task: any) => {
      return task.date === today && task.isCompleted === false;
    });

    console.log("filtered", filtered);

    // sorting by start time
    const sorted = filtered.sort((a: any, b: any) => {
      if (a.startTime < b.startTime) return -1;
    });

    console.log("sorted", sorted);

    setFilteredTasks(sorted);
  }, [tasks]);

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <Tasks />
      </div>
      <div className="flex-1 bg-[#EFFAFD] text-black p-4 h-fit border rounded-md">
        <h1 className="text-2xl font-bold">Today's Tasks</h1>

        <div className="mt-4">
          {filteredTasks.map((task: any) => (
            <div key={task.id} className="mb-4 flex gap-4">
              <h2 className="text-xl font-bold">{task.title}</h2>

              <p className="text-gray-500">{task.description}</p>
              <p className="text-gray-500">{task.startTime}</p>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <p className="text-gray-500">No tasks for today</p>
          )}
        </div>
      </div>
    </div>
  );
}
