import React, { useState } from "react";
import styled from "styled-components";
import { trash } from "@/app/utils/Icons"; // importing trash icon
import formatDate from "@/app/utils/formatDate"; // importing date formatting utility
import { useGlobalState } from "@/app/context/globalProvider"; // importing global state hook
import axios from "axios"; // importing axios for HTTP requests
import { toast } from "react-hot-toast"; // importing toast notifications
import { usePathname } from "next/navigation"; // importing navigation hook

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
  priority,
  moodAfter,
  actualWorkload,
  actualDuration,
  startTime,
  completionTime,
}: Props) {
  const params = usePathname().split("/");
  const share = params[1] === "share"; // check if the task should be shared
  const { theme, deleteTask, updateTask, allTasks } = useGlobalState(); // accessing global state
  const [edit, setEdit] = useState(false); // state to handle edit mode
  const [newWorkload, setWorkload] = useState(workload); // state for workload
  const [userId, setUserId] = useState(""); // state for user ID
  const [message, setMessage] = useState(""); // state for message
  const [newMoodAfter, setMoodAfter] = useState(moodAfter); // state for mood after task completion
  const [newActualDuration, setActualDuration] = useState(actualDuration); // state for actual duration

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
      completionTime,
      userId,
      share: true,
      message,
      moodAfter,
    };

    try {
      const res = await axios.post("/api/tasks", task); // sending POST request to share task

      if (res.data.error) {
        toast.error(res.data.error); // displaying error message
      } else {
        toast.success("Task Shared"); // displaying success message
        allTasks(); // fetching all tasks
      }
    } catch (error) {
      toast.error("Error has occurred"); // displaying error message
      console.error(error); // logging error to console
    }
  };

  // Function to handle task update
  const handleUpdateTask = () => {
    updateTask({
      id,
      moodAfter: newMoodAfter,
      actualDuration: newActualDuration,
      actualWorkload: newWorkload,
      isCompleted: !isCompleted,
    });
    setEdit(false); // exit edit mode
  };

  return (
    <>
      <TaskItemRow theme={theme}>
        {/* Displaying task details */}
        <StyledTd>{title}</StyledTd>
        <StyledTd description>{description}</StyledTd>
        <StyledTd>{formatDate(date)}</StyledTd>
        <StyledTd>{startTime}</StyledTd>
        <StyledTd>{completionTime}</StyledTd>
        <StyledTd>{workload}</StyledTd>
        <StyledTd>{mood}</StyledTd>
        <StyledTd>{priority}</StyledTd>
        <StyledTd>
          {edit ? (
            <StyledSelect value={newWorkload} onChange={(e) => setWorkload(e.target.value)}>
              <option value="">Select Workload</option>
              {["Low", "Medium", "High"].map((workload) => (
                <option key={workload} value={workload}>
                  {workload}
                </option>
              ))}
            </StyledSelect>
          ) : (
            actualWorkload
          )}
        </StyledTd>
        <StyledTd>
          {edit ? (
            <StyledSelect value={newMoodAfter} onChange={(e) => setMoodAfter(e.target.value)}>
              <option value="">Select Mood</option>
              {["Happy", "Anxious", "Focused", "Bored", "Excited"].map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </StyledSelect>
          ) : (
            moodAfter ? moodAfter : "N/A"
          )}
        </StyledTd>
        <StyledTd>
          {edit ? (
            <StyledInput
              type="text"
              value={newActualDuration}
              onChange={(e) => setActualDuration(e.target.value)}
            />
          ) : (
            newActualDuration
          )}
        </StyledTd>
        <StyledTd>
          {/* Buttons to save, complete, or enter edit mode */}
          <StyledButton
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
            completed={isCompleted}
            theme={theme}
          >
            {edit ? "Save" : isCompleted ? "Completed" : "Not Completed"}
          </StyledButton>
        </StyledTd>
        <StyledTd>
          {/* Edit and delete buttons */}
          <StyledButton className="edit" onClick={() => setEdit(!edit)}>
            {edit ? "Cancel" : "Edit"}
          </StyledButton>
          <StyledButton className="delete" onClick={() => deleteTask(id)}>
            {trash}
          </StyledButton>
        </StyledTd>
      </TaskItemRow>

      {share && (
        <ShareTaskSection theme={theme}>
          <p>Share Task</p>
          <div>
            <StyledInput
              onChange={(e) => setUserId(e.target.value)}
              type="text"
              placeholder="Enter UserId"
            />
            <StyledInput
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Message"
            />
          </div>
          <StyledButton onClick={shareTask}>Share</StyledButton>
        </ShareTaskSection>
      )}
    </>
  );
}

// Styles for the table cells using styled-components
const StyledTd = styled.td<{ description?: boolean }>`
  text-align: center;
  padding: 0.3rem;
  border: 1px solid #D7CEC7;
  font-size: 0.8rem;
  color: #D7CEC7;
  max-width: ${(props) => (props.description ? "200px" : "100px")};
  word-wrap: ${(props) => (props.description ? "break-word" : "normal")};
`;

const StyledInput = styled.input`
  background-color: #4A8BDF;
  text-align: center;
  padding: 0.3rem;
  width: 100%;
  font-size: 0.8rem;
  color: #D7CEC7;
`;

const StyledSelect = styled.select`
  background-color: #4A8BDF;
  text-align: center;
  padding: 0.3rem;
  width: 100%;
  font-size: 0.8rem;
  color: #D7CEC7;
`;

const StyledButton = styled.button<{ completed?: boolean; theme?: any }>`
  background-color: ${(props) => (props.completed ? props.theme.colorGreenDark : props.theme.colorDanger)};
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: white;
`;

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

  .edit,
  .delete {
    background: none;
    color: ${(props) => props.theme.colorGrey2};
  }
`;

const ShareTaskSection = styled.div`
  p {
    color: ${(props) => props.theme.colorGrey2};
    padding: 0.8rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
`;

export default TaskItem;
