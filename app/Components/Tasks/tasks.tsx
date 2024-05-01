"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalState } from "../../context/globalProvider";
import { add } from "../../utils/Icons";

function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [priority, setPriority] = useState("");
  const [mood, setMood] = useState("");
  const [workload, setWorkload] = useState("");
  const [timeToComplete, setTimeToComplete] = useState(0);
  const [moodAfter, setMoodAfter] = useState("");
  const [busy, setBusy] = useState(false);
  const [dueTime, setDueTime] = useState("00:00:00");

  const { theme, allTasks, tasks } = useGlobalState();

  const priorities = ["Low", "Medium", "High"];
  const moods = ["Happy", "Anxious", "Focued", "Bored", "Excited"];
  const workloads = ["Light", "Moderate", "Heavy"];

  useEffect(() => {
    const tasksAtDate = tasks.filter((task: any) => task.date === date);

    if (tasksAtDate.length >= 5) {
      setBusy(true);
    } else {
      setBusy(false);
    }
  }, [allTasks, date]);

  useEffect(() => {
    console.log(completed);
  }, [completed]);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(!completed);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      case "priority":
        setPriority(e.target.value);
        break;
      case "mood":
        setMood(e.target.value);
        break;
      case "workload":
        setWorkload(e.target.value);
        break;
      case "timeToComplete":
        setTimeToComplete(e.target.value);
        break;
      case "moodAfter":
        setMoodAfter(e.target.value);
        break;
      case "dueTime":
        setDueTime(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
      priority,
      mood,
      workload,
      timeToComplete,
      dueTime,
      moodAfter
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        toast.success("Task created");
        allTasks();
      }
    } catch (error) {
      toast.error("Error has occurred");
      console.log(error);
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Task Name</label>
        <input
          style={{
            color: "white",
            backgroundColor: theme.colorGreyDark,
          }}
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g, Meal prep for the week"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          style={{
            color: "white",
            backgroundColor: theme.colorGreyDark,
          }}
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="e.g, Use online recipe"
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Date Due</label>
        <input
          style={{
            color: "white",
            backgroundColor: theme.colorGreyDark,
          }}
          value={date}
          onChange={handleChange("date")}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control">
        <label htmlFor="priority">Priority</label>
        <select
          style={{
            backgroundColor: theme.colorGreyDark,
          }}
          value={priority}
          onChange={handleChange("priority")}
          name="priority"
          id="priority"
        >
          <option value="">Select Priority</option>
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <div className="input-control">
        <label htmlFor="mood">Mood</label>
        <select
          style={{
            backgroundColor: theme.colorGreyDark,
          }}
          value={mood}
          onChange={handleChange("mood")}
          name="mood"
          id="mood"
        >
          <option value="">Select Mood</option>
          {moods.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>
      </div>

      {completed === true && (
        <div className="input-control">
          <label htmlFor="mood">Mood After</label>
          <select
            style={{
              backgroundColor: theme.colorGreyDark,
            }}
            value={moodAfter}
            onChange={handleChange("moodAfter")}
            name="mood"
            id="mood"
          >
            <option value="">Select Mood</option>
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="input-control">
        <label htmlFor="workload">Workload</label>
        <select
          style={{
            backgroundColor: theme.colorGreyDark,
          }}
          value={workload}
          onChange={handleChange("workload")}
          name="workload"
          id="workload"
        >
          <option value="">Select Workload</option>
          {workloads.map((workload) => (
            <option key={workload} value={workload}>
              {workload}
            </option>
          ))}
        </select>
      </div>

      <div className="input-control">
        <label htmlFor="timeToComplete">Time to Complete (Minutes)</label>
        <input
          style={{
            color: "white",
            backgroundColor: theme.colorGreyDark,
          }}
          value={timeToComplete}
          onChange={handleChange("timeToComplete")}
          type="number"
          name="timeToComplete"
        />
      </div>

      <div className="input-control">
        <label htmlFor="dueTime">Due Time</label>
        <input
          style={{
            color: "white",
            backgroundColor: theme.colorGreyDark,
          }}
          value={dueTime}
          onChange={handleChange("dueTime")}
          type="time"
          name="dueTime"
          placeholder="e.g, 30"
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          value={completed.toString()}
          onChange={handleChange("completed")}
          type="checkbox"
          name="completed"
          id="completed"
        />
      </div>
      {/* <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          value={important.toString()}
          onChange={handleChange("important")}
          type="checkbox"
          name="important"
          id="important"
        />
      </div> */}

      {busy && (
        <div className="input-control">
          <p>
            You have too many tasks for this date. Please select another date.
          </p>
        </div>
      )}

      <div className="submit-btn gap-4 flex justify-end">
        {busy && (
          <Button
            name="Go back"
            padding={"0.8rem 2rem"}
            borderRad={"0.8rem"}
            background={"rgb(0, 163, 255)"}
          />
        )}

        <Button
          type="submit"
          name={busy ? "Add anyway" : "Create Task"}
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input[type="text"],
    textarea {
      width: 100%;
      padding: 1rem;
      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: black; /* Set text color to black */
      border-radius: 0.5rem;
    }

    input[type="date"] {
      /* Reset text color for date input */
      color: black;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;
