import React, { useState } from "react"; // importing React and useState hook
import styled from "styled-components"; // importing styled-components
import { edit, trash } from "@/app/utils/Icons"; // importing icons
import formatDate from "@/app/utils/formatDate"; // importing formatDate utility function
import { useGlobalState } from "@/app/context/globalProvider"; // importing useGlobalState hook
import axios from "axios"; // importing axios for making HTTP requests
import { toast } from "react-hot-toast"; // importing toast notification
import { usePathname } from "next/navigation"; // importing usePathname hook from next/navigation

// interface for props of TaskItem component
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
  duration: string;
}

// TaskItem component
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
  duration,
}: Props) {
  const params = usePathname().split("/"); // getting pathname and splitting it
  const share = params[1] === "share"; // checking if share parameter is present in the pathname
  const { theme, deleteTask, updateTask, allTasks } = useGlobalState(); // accessing theme, deleteTask, updateTask, and allTasks function from global state
  const [editMode, setEditMode] = useState(false); // state for edit mode
  const [newWorkload, setNewWorkload] = useState(workload); // state for new workload
  const [userId, setUserId] = useState(""); // state for user ID
  const [message, setMessage] = useState(""); // state for message
  const [newMoodAfter, setNewMoodAfter] = useState(moodAfter); // state for new mood after
  const [actualDuration, setActualDuration] = useState(""); // state for actual duration

  // function to share task
  const shareTask = async () => {
    const task = {
      title,
      description,
      date,
      completed: isCompleted,
      priority,
      mood,
      workload,
      timeToComplete: completionTime,
      userId: userId,
      share: true,
      message,
      moodAfter,
    };

    try {
      const res = await axios.post("/api/tasks", task); // making POST request to create task

      if (res.data.error) {
        toast.error(res.data.error); // displaying error message if error occurs
      }

      if (!res.data.error) {
        toast.success("Task Shared"); // displaying success message if task is shared successfully
        allTasks(); // fetching all tasks
      }
    } catch (error) {
      toast.error("Error has occurred"); // displaying error message if error occurs
      console.log(error); // logging the error
    }
  };

  // rendering the TaskItem component
  return (
    <>
      {/* TaskItemRow */}
      <TaskItemRow theme={theme}>
        <td>{title}</td>
        <td>{description}</td>
        <td>{formatDate(date)}</td>
        <td>{workload}</td>
        <td>{priority}</td>
        <td>{duration}</td>
        <td>{mood}</td>
        <td>
          {editMode ? (
            <>
              {/* Select for new workload */}
              <select
                style={{
                  backgroundColor: "#4A8BDF",
                }}
                value={newWorkload}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewWorkload(e.target.value)
                }
                name="workload"
                id="workload"
              >
                <option value="">Select Workload</option>
                {["Low", "Medium", "High"].map((workloadOption) => (
                  <option key={workloadOption} value={workloadOption}>
                    {workloadOption}
                  </option>
                ))}
              </select>
            </>
          ) : (
            workload
          )}
        </td>
        <td>
          {editMode ? (
            <>
              {/* Select for new mood after */}
              <select
                style={{
                  backgroundColor: "#4A8BDF",
                }}
                value={newMoodAfter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewMoodAfter(e.target.value)
                }
                name="mood"
                id="mood"
              >
                <option value="">Select Mood</option>
                {["Happy", "Anxious", "Focused", "Bored", "Excited"].map(
                  (moodOption) => (
                    <option key={moodOption} value={moodOption}>
                      {moodOption}
                    </option>
                  )
                )}
              </select>
            </>
          ) : moodAfter ? (
            moodAfter
          ) : (
            "N/A"
          )}
        </td>
        <td>
          {editMode ? (
            <>
              {/* Input for actual duration */}
              <input
                style={{
                  backgroundColor: "#4A8BDF",
                }}
                type="number"
                className="w-16"
                value={actualDuration}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setActualDuration(e.target.value)
                }
              />
            </>
          ) : (
            actualDuration
          )}
        </td>
        <td>
          {/* Button for updating task */}
          <button
            onClick={() => {
              if (editMode) {
                // if edit mode is true
                // update task with new mood after, actual duration, actual workload, and completion status
                updateTask({
                  id,
                  moodAfter: newMoodAfter,
                  actualDuration,
                  actualWorkload: newWorkload,
                  isCompleted: !isCompleted,
                });
              } else if (isCompleted) {
                // if task is completed
                // update task with completion status
                updateTask({
                  id,
                  isCompleted: !isCompleted,
                });
              } else {
                // if not in edit mode and task is not completed
                // set edit mode to true
                setEditMode(true);
              }
            }}
            style={{
              backgroundColor: isCompleted
                ? theme.colorGreenDark
                : theme.colorDanger,
            }}
          >
            {/* Button text based on edit mode and completion status */}
            {editMode ? "Save" : isCompleted ? "Completed" : "Not Completed"}
          </button>
        </td>
        <td>
          {/* Edit button */}
          <button className="edit">{edit}</button>
          {/* Delete button */}
          <button
            className="delete"
            onClick={() => deleteTask(id)}
          >
            {trash}
          </button>
        </td>
      </TaskItemRow>

      {/* Share task section */}
      {share && (
        <div>
          <p
            style={{
              color: theme.colorGrey2,
              padding: "0.8rem",
            }}
          >
            Share Task
          </p>

          {/* Inputs for sharing task */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
            }}
          >
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserId(e.target.value)
              }
              style={{
                padding: "0.8rem",
                border: `1px solid ${theme.borderColor1}`,
                borderRadius: "0.8rem",
                marginBottom: "0.8rem",
                color: "white",
                backgroundColor: "#E4E4E4",
              }}
              type="text"
              placeholder="Enter UserId"
            />
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              style={{
                padding: "0.8rem",
                border: `1px solid ${theme.borderColor1}`,
                borderRadius: "0.8rem",
                marginBottom: "0.8rem",
                color: "white",
                backgroundColor: "#E4E4E4",
              }}
              type="text"
              placeholder="Message"
            />
          </div>

          {/* Button for sharing task */}
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

// styled component for TaskItemRow
const TaskItemRow = styled.tr`
  background-color: ${(props) => props.theme.borderColor2}; // background color of the row
  border-bottom: 1px solid ${(props) => props.theme.borderColor1}; // border bottom of the row

  td {
    padding: 0.8rem; // padding of table cell
    border: none; // removing border of table cell

    &:not(:last-child) {
      border-right: 1px solid ${(props) => props.theme.borderColor1}; // border right for all table cells except last one
    }
  }

  button {
    padding: 0.4rem 0.8rem; // padding of button
    border-radius: 20px; // border radius of button
    border: none; // removing border of button
    cursor: pointer; // setting cursor to pointer for button
    color: white; // text color of button
    font-size: 0.9rem; // font size of button
  }

  .edit,
  .delete {
    background: none; // setting background to none for edit and delete buttons
    color: ${(props) => props.theme.colorGrey2}; // text color of edit and delete buttons
  }
`;

export default TaskItem; // exporting TaskItem component
