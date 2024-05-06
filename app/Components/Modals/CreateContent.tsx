"use client";
import React, { useState } from "react"; // importing React and useState hook
import { useGlobalState } from "../../context/globalProvider"; // importing global state hook
import axios from "axios"; // importing axios for HTTP requests
import toast from "react-hot-toast"; // importing toast notifications library
import styled from "styled-components"; // importing styled-components library
import Button from "../Button/Button"; // importing Button component
import { add } from "@/app/utils/Icons"; // importing add icon

// CreateContent component
function CreateContent() {
  // defining state variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [workload, setWorkload] = useState("Light");
  const [completionTime, setCompletionTime] = useState("");

  // accessing theme and functions from global state
  const { theme, allTasks, closeModal } = useGlobalState();

  // function to handle input change
  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    // updating state based on input name
    switch (name) {
      case "title":
        setTitle(target.value);
        break;
      case "description":
        setDescription(target.value);
        break;
      case "date":
        setDate(target.value);
        break;
      case "completed":
        if (target instanceof HTMLInputElement) {
          setCompleted(target.checked);
        }
        break;
      case "important":
        if (target instanceof HTMLInputElement) {
          setImportant(target.checked);
        }
        break;
      case "workload":
        setWorkload(target.value);
        break;
      case "completionTime":
        setCompletionTime(target.value);
        break;
      default:
        break;
    }
  };

  // function to handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // preventing default form submission behavior

    // creating task object
    const task = {
      title,
      description,
      date,
      completed,
      important,
      workload,
      completionTime,
    };

    try {
      // sending POST request to create task
      const res = await axios.post("/api/tasks", task);

      // handling response
      if (res.data.error) {
        toast.error(res.data.error); // displaying error message
      }

      if (!res.data.error) {
        toast.success("Task created successfully."); // displaying success message
        allTasks(); // refreshing tasks
        closeModal(); // closing modal
      }
    } catch (error) {
      toast.error("Something went wrong."); // displaying generic error message
      console.log(error); // logging error
    }
  };

  // rendering the create task form
  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g, Go for a run"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="e.g, 5km in under 25 mins"
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          value={date}
          onChange={handleChange("date")}
          type="date"
          name="date"
          id="date"
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
      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          value={important.toString()}
          onChange={handleChange("important")}
          type="checkbox"
          name="important"
          id="important"
        />
      </div>
      <div className="input-control">
        <label htmlFor="workload">Predicted Workload</label>
        <select
          value={workload}
          onChange={handleChange("workload")}
          id="workload"
          name="workload"
        >
          <option value="Light">Light</option>
          <option value="Moderate">Moderate</option>
          <option value="Heavy">Heavy</option>
        </select>
      </div>
      <div className="input-control">
        <label htmlFor="completionTime">Predicted Completion Time</label>
        <input
          type="time"
          value={completionTime}
          onChange={handleChange("completionTime")}
          id="completionTime"
          name="completionTime"
        />
      </div>
      <div className="submit-btn flex justify-end">
        {/* Button component for submitting the form */}
        <Button
          type="submit"
          name="Create Task"
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

// styled form component for create task form
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

    input,
    textarea,
    select {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
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

export default CreateContent; // exporting CreateContent component
