"use client"

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

// create a context for the global state
export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

// define the global provider component
export const GlobalProvider = ({ children }) => {
  const { user } = useUser();

  // state variables
  const [selectedTheme, setSelectedTheme] = useState(0); // selected theme index
  const [isLoading, setIsLoading] = useState(false); // flag indicating whether tasks are being loaded
  const [modal, setModal] = useState(false); // flag indicating whether a modal is open
  const [collapsed, setCollapsed] = useState(false); // flag indicating whether the sidebar is collapsed
  const [tasks, setTasks] = useState([]); // array of tasks

  const theme = themes[selectedTheme]; // selected theme

  // open modal function
  const openModal = () => {
    setModal(true);
  };

  // close modal function
  const closeModal = () => {
    setModal(false);
  };

  // collapse menu function
  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  // function to fetch all tasks
  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // function to delete a task
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // function to update a task
  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      toast.success("Task updated");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // filter tasks based on their completion status
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        modal,
        openModal,
        closeModal,
        allTasks,
        collapsed,
        collapseMenu,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

// custom hook to access the global state
export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
