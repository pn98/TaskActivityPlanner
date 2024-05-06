"use client";

import React, { useState, useEffect } from "react"; // importing React, useState, and useEffect
import styled from "styled-components"; // importing styled-components
import Button from "../Button/Button"; // importing Button component
import axios from "axios"; // importing axios for making HTTP requests
import toast from "react-hot-toast"; // importing toast notification
import { useGlobalState } from "../../context/globalProvider"; // importing useGlobalState hook
import { add } from "../../utils/Icons"; // importing add icon

// CreateContent component
function CreateContent() {
  const [title, setTitle] = useState(""); // state for task title
  const [description, setDescription] = useState(""); // state for task description
  const [date, setDate] = useState(""); // state for due date
  const [completed, setCompleted] = useState(false); // state for completion status
  const [important, setImportant] = useState(false); // state for importance status
  const [priority, setPriority] = useState(""); // state for task priority
  const [mood, setMood] = useState(""); // state for mood
  const [workload, setWorkload] = useState(""); // state for workload
  const [timeToComplete, setTimeToComplete] = useState(""); // state for time to complete
  const [moodAfter, setMoodAfter] = useState(""); // state for mood after task completion
  const [busy, setBusy] = useState(false); // state for busy status
  const [startTime, setStartTime] = useState("00:00:00"); // state for start time
  const [duration, setDuration] = useState(""); // state for duration

  const { theme, allTasks, tasks } = useGlobalState(); // accessing theme, allTasks, and tasks from global state

  const priorities = ["Low", "Medium", "High"]; // priority options
  const moods = ["Happy", "Anxious", "Focused", "Bored", "Excited"]; // mood options
  const workloads = ["Light", "Moderate", "Heavy"]; // workload options

  // useEffect to check if tasks at date are too many
  useEffect(() => {
    const tasksAtDate = tasks.filter((task: any) => task.date === date); // filtering tasks for the selected date

    if (tasksAtDate.length >= 5) {
      // if there are more than or equal to 5 tasks for the selected date
      setBusy(true); // set busy state to true
    } else {
      setBusy(false); // set busy state to false
    }
  }, [allTasks, date]);

  // useEffect to log completion status
  useEffect(() => {
    console.log(completed);
  }, [completed]);

  // handleChange function to handle input changes
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
      case "startTime":
        setStartTime(e.target.value);
        break;
      case "duration":
        setDuration(e.target.value);
        break;
      default:
        break;
    }
  };

  // handleSubmit function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent default form submission behavior

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
      startTime,
      moodAfter,
    };

    try {
      const res = await axios.post("/api/tasks", task); // making POST request to create task

      if (res.data.error) {
        toast.error(res.data.error); // displaying error message if error occurs
      }

      if (!res.data.error) {
        toast.success("Task created"); // displaying success message if task is created successfully
        allTasks(); // fetching all tasks
      }
    } catch (error) {
      toast.error("Error has occurred"); // displaying error message if error occurs
      console.log(error); // logging the error
    }
  };

  // rendering the CreateContent component
  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Task Name</label>
        <input
          style={{
            color: "#E85a4f",
            backgroundColor: "#D8c3a5",
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
            color: "#E85a4f",
            backgroundColor: "#D8c3a5",
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
            color: "#E85a4f",
            backgroundColor: "#D8c3a5",
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
            backgroundColor: "#D8c3a5",
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
            backgroundColor: "#D8c3a5",
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
              backgroundColor: "#D8c3a5",
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
            backgroundColor: "#D8c3a5",
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
            color: "#E85a4f",
            backgroundColor: "#D8c3a5",
          }}
          value={timeToComplete}
          onChange={handleChange("timeToComplete")}
          type="number"
          name="timeToComplete"
        />
      </div>

      <div className="input-control">
        <label htmlFor="startTime">Start Time</label>
        <input
          style={{
            color: "#E85a4f",
            backgroundColor: "#D8c3a5",
          }}
          value={startTime}
          onChange={handleChange("startTime")}
          type="time"
          name="startTime"
          placeholder="e.g, 30"
        />
      </div>

      <div className="input-control">
        <label htmlFor="duration">Duration</label>

        <input
          style={{
            color: "#E85a4f",
            backgroundColor: "#D8c3a5",
          }}
          value={duration}
          onChange={handleChange("duration")}
          type="number"
          name="duration"
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

      {busy && (
        <div className="input-control">
          <p>
            This day contains 5 or more tasks already, would you like to Add Anyway?
          </p>
        </div>
      )}

      <div className="gap-4 flex justify-end">
        {busy && (
          <button
            onClick={() => {
              // clear all form fields
              setTitle("");
              setDescription("");
              setDate("");
              setCompleted(false);
              setImportant(false);
              setPriority("");
              setMood("");
              setWorkload("");
              setTimeToComplete("");
              setStartTime("00:00:00");
              setMoodAfter("");
            }}
            type="button"
            style={{
              backgroundColor: theme.colorGrey1,
              padding: "0.8rem 2rem",
              borderRadius: "0.8rem",
              color: theme.colorGrey3,
            }}
          >
            Clear
          </button>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          name={busy ? "Add anyway" : "Create Task"}
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background="#8e8d8a"
        />
      </div>
    </CreateContentStyled>
  );
}

// styled component for CreateContentStyled
const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1}; // text color

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
      color: "#E85a4f !important"; // label color

      span {
        color: ${(props) => props.theme.colorPrimaryGreen}; // span color
      }
    }

    input[type="text"],
    textarea {
      width: 100%;
      padding: 1rem;
      resize: none;
      background-color: "#D8c3a5"; // input background color
      border-radius: 0.5rem; // border radius
    }

    input[type="date"] {
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out; // transition effect

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0}; // icon color
    }

    &:hover {
      color: ${(props) => props.theme.colorWhite} !important; // hover color
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

export default CreateContent; // exporting CreateContent component
