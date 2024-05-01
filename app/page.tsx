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

    setFilteredTasks(filtered);
  }, [tasks]);

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <Tasks />
      </div>
      <div className="flex-1 p-4 h-fit border rounded-md">
        <h1 className="text-2xl font-bold">Today's Tasks</h1>

        <div className="mt-4">
          {filteredTasks.map((task: any) => (
            <div key={task.id} className="mb-4 flex gap-4">
              <h2 className="text-xl font-bold">{task.title}</h2>

              <p className="text-gray-500">{task.description}</p>
              <p className="text-gray-500">
                <span className="font-bold">Due: </span>
                {task.dueTime}
              </p>
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
