import React, { useState } from "react";
import styled from "styled-components";
import { edit, trash } from "@/app/utils/Icons";
import formatDate from "@/app/utils/formatDate";
import { useGlobalState } from "@/app/context/globalProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
  workload: string;
  completionTime: string;
  mood: string;
  priority: string;
  moodAfter: string;
  actualWorkload: string;
  actualDuration: string;
  startTime: string;
  timeToComplete: string;
}

// TaskItem component definition
function TaskItem({
  title,
  description,
  mood,
  date,
  isCompleted,
  id,
  workload,
  completionTime,
  priority,
  moodAfter,
  actualWorkload,
  actualDuration,
  startTime,
  timeToComplete,
}: Props) {
  const params = usePathname().split("/");
  const share = params[1] === "share";
  const { theme, deleteTask, updateTask, allTasks } = useGlobalState();
  const [edit, setEdit] = useState(false);
  const [newWorkload, setWorkload] = useState(workload);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [newMoodAfter, setMoodAfter] = useState(moodAfter);
  const [newActualDuration, setActualDuration] = useState(actualDuration);
  const [newTimeToComplete, setTimeToComplete] = useState(timeToComplete);

  // Function to share task
  const shareTask = async () => {
    const task = {
      title,
      description,
      date,
      completed: isCompleted,
      priority,
      mood,
      workload,
      timeToComplete,
      userId: userId,
      share: true,
      message,
      moodAfter,
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        toast.success("Task Shared");
        allTasks();
      }
    } catch (error) {
      toast.error("Error has occurred");
      console.log(error);
    }
  };

  // Function to handle task update
  const handleUpdateTask = () => {
    updateTask({
      id,
      moodAfter: newMoodAfter,
      actualDuration: newActualDuration,
      actualWorkload: newWorkload,
      timeToComplete: newTimeToComplete,
      isCompleted: !isCompleted,
    });
    setEdit(false);
  };

  return (
    <>
      <TaskItemRow theme={theme}>
        {/* Task title */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>{title}</td>
        {/* Task description */}
        <td
          style={{
            textAlign: "center",
            maxWidth: "200px",
            wordWrap: "break-word",
            fontSize: "0.8rem",
            color: "#D7CEC7",
          }}
        >
          {description}
        </td>
        {/* Task date */}
        <td
          style={{
            textAlign: "center",
            maxWidth: "100px",
            fontSize: "0.8rem",
            color: "#D7CEC7",
          }}
        >
          {formatDate(date)}
        </td>
        {/* Task start time */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>{startTime}</td>
        {/* Task duration (minutes) */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>
          {edit ? (
            <input
              style={{
                backgroundColor: "#4A8BDF",
                textAlign: "center",
                padding: "0.3rem",
                width: "100%",
                fontSize: "0.8rem",
                color: "#D7CEC7",
              }}
              type="number"
              value={newTimeToComplete}
              onChange={(e) => setTimeToComplete(e.target.value)}
            />
          ) : (
            timeToComplete
          )}
        </td>
        {/* Task workload */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>{workload}</td>
        {/* Task mood */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>{mood}</td>
        {/* Task priority */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>{priority}</td>
        {/* Task actual workload */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>
          {edit ? (
            <select
              style={{
                backgroundColor: "#4A8BDF",
                textAlign: "center",
                padding: "0.3rem",
                width: "100%",
                fontSize: "0.8rem",
                color: "#D7CEC7",
              }}
              value={newWorkload}
              onChange={(e) => setWorkload(e.target.value)}
              name="workload"
              id="workload"
            >
              <option value="">Select Workload</option>
              {["Low", "Medium", "High"].map((workload) => (
                <option key={workload} value={workload}>
                  {workload}
                </option>
              ))}
            </select>
          ) : (
            actualWorkload
          )}
        </td>
        {/* Task mood after */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>
          {edit ? (
            <select
              style={{
                backgroundColor: "#4A8BDF",
                textAlign: "center",
                padding: "0.3rem",
                width: "100%",
                fontSize: "0.8rem",
                color: "#D7CEC7",
              }}
              value={newMoodAfter}
              onChange={(e) => setMoodAfter(e.target.value)}
              name="mood"
              id="mood"
            >
              <option value="">Select Mood</option>
              {["Happy", "Anxious", "Focused", "Bored", "Excited"].map(
                (mood) => (
                  <option key={mood} value={mood}>
                    {mood}
                  </option>
                )
              )}
            </select>
          ) : (
            moodAfter ? moodAfter : "N/A"
          )}
        </td>
        {/* Task actual duration */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>
          {edit ? (
            <input
              style={{
                backgroundColor: "#4A8BDF",
                textAlign: "center",
                padding: "0.3rem",
                width: "100%",
                fontSize: "0.8rem",
                color: "#D7CEC7",
              }}
              type="text"
              value={newActualDuration}
              onChange={(e) => setActualDuration(e.target.value)}
            />
          ) : (
            newActualDuration
          )}
        </td>
        {/* Task status button */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>
          <button
            onClick={() => {
              if (edit) {
                handleUpdateTask();
              } else if (isCompleted) {
                updateTask({
                  id,
                  isCompleted: !isCompleted,
                });
              } else {
                setEdit(true);
              }
            }}
            style={{
              backgroundColor: isCompleted
                ? theme.colorGreenDark
                : theme.colorDanger,
              fontSize: "0.8rem",
              padding: "0.3rem 0.6rem",
            }}
          >
            {edit ? "Save" : isCompleted ? "Completed" : "Not Completed"}
          </button>
        </td>
        {/* Task actions buttons */}
        <td style={{ textAlign: "center", fontSize: "0.8rem", color: "#D7CEC7" }}>
          <button className="edit" onClick={() => setEdit(!edit)}>
            {edit ? "Cancel" : edit}
          </button>
          <button className="delete" onClick={() => deleteTask(id)}>
            {trash}
          </button>
        </td>
      </TaskItemRow>

      {/* Share task section */}
      {share && (
        <div>
          <p style={{ color: theme.colorGrey2, padding: "0.8rem" }}>
            Share Task
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <input
              onChange={(e) => setUserId(e.target.value)}
              style={{
                padding: "0.8rem",
                border: `1px solid ${theme.borderColor1}`,
                borderRadius: "0.8rem",
                marginBottom: "0.8rem",
                color: "#D7CEC7",
                backgroundColor: "#E4E4e4",
              }}
              type="text"
              placeholder="Enter UserId"
            />
            <input
              onChange={(e) => setMessage(e.target.value)}
              style={{
                padding: "0.8rem",
                border: `1px solid ${theme.borderColor1}`,
                borderRadius: "0.8rem",
                marginBottom: "0.8rem",
                color: "#D7CEC7",
                backgroundColor: "#E4E4e4",
              }}
              type="text"
              placeholder="Message"
            />
          </div>
          <button
            style={{
              backgroundColor: "#8e8d8a",
              padding: "0.8rem",
              border: "none",
              borderRadius: "0.8rem",
              color: "white",
              cursor: "pointer",
              marginBottom: "0.8rem",
            }}
            onClick={shareTask}
          >
            Share
          </button>
        </div>
      )}
    </>
  );
}

// Styled component for TaskItemRow
const TaskItemRow = styled.tr`
  background-color: ${(props) => props.theme.borderColor2};
  border-bottom: 1px solid ${(props) => props.theme.borderColor1};

  td {
    padding: 0.3rem;
    border: none;
    font-size: 0.8rem;

    &:not(:last-child) {
      border-right: 1px solid ${(props) => props.theme.borderColor1};
    }
  }

  button {
    padding: 0.3rem 0.6rem;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 0.8rem;
  }

  .edit,
  .delete {
    background: none;
    color: ${(props) => props.theme.colorGrey2};
  }
`;

export default TaskItem;
