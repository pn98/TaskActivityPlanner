"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

// Create contexts for global state and updates
export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

// Define the global provider component
export const GlobalProvider = ({ children }) => {
  const { user } = useUser();

  // State variables
  const [selectedTheme, setSelectedTheme] = useState(0); // Selected theme index
  const [isLoading, setIsLoading] = useState(false); // Flag indicating whether tasks are being loaded
  const [modal, setModal] = useState(false); // Flag indicating whether a modal is open
  const [collapsed, setCollapsed] = useState(false); // Flag indicating whether the sidebar is collapsed
  const [tasks, setTasks] = useState([]); // Array of tasks

  const theme = themes[selectedTheme]; // Selected theme

  // Open modal function
  const openModal = () => {
    setModal(true);
  };

  // Close modal function
  const closeModal = () => {
    setModal(false);
  };

  // Collapse menu function
  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  // Function to fetch all tasks
  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setTasks(sorted);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Function to update a task
  const updateTask = async (task) => {
    try {
      await axios.put(`/api/tasks`, task);
      toast.success("Task updated");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Function to complete a task and update the actual duration
  const completeTask = async (id, actualDuration) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        const updatedTask = {
          ...taskToUpdate,
          actualDuration,
          isCompleted: true,
        };
        await updateTask(updatedTask);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Filter tasks based on their completion status
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
        completeTask,
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

// Custom hooks to access the global state and updates
export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
