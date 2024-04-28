import React from "react";
import styled from "styled-components";
import { edit, trash } from "@/app/utils/Icons";
import formatDate from "@/app/utils/formatDate";
import { useGlobalState } from "@/app/context/globalProvider";
import { useState } from "react";

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
}

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
}: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState();
  const [edit, setEdit] = useState(false);
  const [newCompletionTime, setCompletionTime] = useState(completionTime);
  const [newMood, setMood] = useState(mood);
  const [newWorkload, setWorkload] = useState(workload);

  return (
    <TaskItemRow theme={theme}>
      <td>{title}</td>
      <td>{description}</td>
      <td>{formatDate(date)}</td>
      <td>
        {edit ? (
          <>
            <select
              style={{
                backgroundColor: theme.colorGreyDark,
              }}
              value={newWorkload}
              onChange={(e: any) => setWorkload(e.target.value)}
              name="workload"
              id="workload"
            >
              <option value="">Select Workload</option>
              {["Low", "Medium", "High"].map((workload: any) => (
                <option key={workload} value={workload}>
                  {workload}
                </option>
              ))}
            </select>
          </>
        ) : (
          workload
        )}
      </td>
      <td>{priority}</td>
      <td>
        {edit ? (
          <>
            <input
              style={{
                backgroundColor: "gray",
              }}
              type="time"
              value={newCompletionTime}
              onChange={(e) => setCompletionTime(e.target.value)}
            />
          </>
        ) : (
          completionTime
        )}
      </td>
      <td>
        {edit ? (
          <>
            <select
              style={{
                backgroundColor: theme.colorGreyDark,
              }}
              value={newMood}
              onChange={(e: any) => setMood(e.target.value)}
              name="mood"
              id="mood"
            >
              <option value="">Select Mood</option>
              {["Happy", "Sad", "Neutral"].map((mood: any) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </>
        ) : (
          mood
        )}
      </td>
      <td>
        <button
          onClick={() => {
            if (edit) {
              updateTask({
                id,
                completionTime: newCompletionTime,
                mood: newMood,
                workload: newWorkload,
                isCompleted: !isCompleted,
              });
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
          }}
        >
          {edit ? "Save" : isCompleted ? "Completed" : "Not Completed"}
        </button>
      </td>
      <td>
        <button className="edit">{edit}</button>
        <button className="delete" onClick={() => deleteTask(id)}>
          {trash}
        </button>
      </td>
    </TaskItemRow>
  );
}

const TaskItemRow = styled.tr`
  background-color: ${(props) => props.theme.borderColor2};
  border-bottom: 1px solid ${(props) => props.theme.borderColor1};

  td {
    padding: 0.8rem;
    border: none;

    &:not(:last-child) {
      border-right: 1px solid ${(props) => props.theme.borderColor1};
    }
  }

  button {
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 0.9rem;
  }

  .edit,
  .delete {
    background: none;
    color: ${(props) => props.theme.colorGrey2};
  }
`;

export default TaskItem;
